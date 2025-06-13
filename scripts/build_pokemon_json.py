"""Build pokemon.json with scene assignments based on types.

This script is a small utility used during development to pre-process the raw
Pokédex data. It groups Pokémon by their primary type and assigns them to a
scene so the game can easily look up which creatures appear in each region.
Running this script isn't required for normal gameplay; the resulting
``pokemon.json`` file is committed to the repository.
"""

import json
from collections import defaultdict
from pathlib import Path

# Determine the project directories so we can locate the data files no matter
# where the script is executed from.
script_dir = Path(__file__).parent
project_root = script_dir.parent
data_dir = project_root / 'src' / 'data'

# Use relative paths to locate the source and output files
pokedex_path = data_dir / 'pokedex.json'
output_path = data_dir / 'pokemon.json'
scenes_path = data_dir / 'scenes.json'

# Region mapping: Dynamically load scene IDs from scenes.json. Each tuple maps a
# scene ID to one or more Pokémon types that thematically fit that region.
with open(scenes_path, 'r', encoding='utf-8') as f:
    scenes_data = json.load(f)

# This mapping is now more for theme definition than for hardcoding IDs
scene_type_map = [
    (1, ["Grass", "Bug"]),
    (2, ["Grass", "Bug"]),
    (3, ["Electric", "Steel"]),
    (4, ["Rock", "Ground"]),
    (5, ["Grass", "Fairy"]),
    (6, ["Water"]),
    (7, ["Fire"]),
    (8, ["Normal", "Flying"]),
    (9, ["Fairy", "Grass"]),
    (10, ["Fire", "Dark"]),
    (11, ["Ice"]),
    (12, ["Poison", "Ground"]),
    (13, ["Psychic", "Dragon"])
]

# Load pokedex.json which contains every Pokémon along with their types.
with open(pokedex_path, 'r', encoding='utf-8') as f:
    pokedex = json.load(f)

# Assign Pokémon by primary type
scene_pokemon = defaultdict(list)
unassigned = []

# Go through every Pokémon entry and attempt to assign it to a region based on
# its primary type. Any Pokémon that don't match a themed region are stored in
# `unassigned` so we can distribute them later.
for entry in pokedex:
    pid = entry['id']
    name = entry['name']['english'] if isinstance(entry['name'], dict) else entry['name']
    types = entry['type'] if isinstance(entry['type'], list) else [entry['type']]
    primary_type = types[0]

    # Try to assign to the first region whose theme matches the primary type
    assigned = False
    for scene_id, theme_types in scene_type_map:
        if primary_type in theme_types:
            scene_pokemon[scene_id].append({
                "id": pid,
                "name": name,
                "types": types,
                "sprite": f"{str(pid).zfill(3)}MS.png",
                "image": f"{str(pid).zfill(3)}.png",
                "scene_id": scene_id
            })
            assigned = True
            break

    if not assigned:
        unassigned.append({
            "id": pid,
            "name": name,
            "types": types,
            "sprite": f"{str(pid).zfill(3)}MS.png",
            "image": f"{str(pid).zfill(3)}.png",
            "scene_id": None
        })

# Distribute unassigned Pokémon to scenes with the fewest Pokémon in a
# deterministic manner so running this script multiple times gives the same
# result.
if unassigned:
    # Get all possible scene IDs from the scenes file
    all_scene_ids = {scene['id'] for scene in scenes_data}

    # Initialize counts for all scenes, including potentially empty ones
    counts = {scene_id: len(scene_pokemon.get(scene_id, [])) for scene_id in all_scene_ids}

    # Sort unassigned Pokémon by ID to ensure a consistent processing order
    unassigned.sort(key=lambda p: p['id'])

    for mon in unassigned:
        # Find the scene with the fewest Pokémon. Sort by count, then by scene_id for determinism.
        target_scene_id = sorted(counts.items(), key=lambda item: (item[1], item[0]))[0][0]

        mon["scene_id"] = target_scene_id
        scene_pokemon[target_scene_id].append(mon)
        counts[target_scene_id] += 1


# Flatten and sort output list by scene, then id
all_pokemon = []
for scene_id in sorted(scene_pokemon.keys()):
    all_pokemon.extend(sorted(scene_pokemon[scene_id], key=lambda x: x["id"]))

# Save the final list to pokemon.json so the game can load it directly.
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(all_pokemon, f, ensure_ascii=False, indent=2)

print(f"pokemon.json written with {len(all_pokemon)} entries assigned to regions by type.")