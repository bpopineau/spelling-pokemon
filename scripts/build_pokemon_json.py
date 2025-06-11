import json
from collections import defaultdict

# Paths
pokedex_path = r'D:\PokeReader\pokedex-data\pokedex.json'
output_path = r'D:\PokeReader\pokedex-data\pokemon.json'

# Region mapping: scene_id to theme types
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

# Load pokedex.json
with open(pokedex_path, 'r', encoding='utf-8') as f:
    pokedex = json.load(f)

# Assign Pokémon by primary type
scene_pokemon = defaultdict(list)
unassigned = []

for entry in pokedex:
    pid = entry['id']
    name = entry['name']['english'] if isinstance(entry['name'], dict) else entry['name']
    types = entry['type'] if isinstance(entry['type'], list) else [entry['type']]
    primary_type = types[0]

    # Try to assign to first region matching primary type
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

# Distribute unassigned Pokémon to scenes with fewest Pokémon
if unassigned:
    counts = {scene_id: len(pkmn_list) for scene_id, pkmn_list in scene_pokemon.items()}
    scene_ids = list(counts.keys())
    idx = 0
    for mon in unassigned:
        # Find the scene with the fewest Pokémon
        min_scene = min(counts.keys(), key=lambda k: counts[k])
        mon["scene_id"] = min_scene
        scene_pokemon[min_scene].append(mon)
        counts[min_scene] += 1
        idx += 1

# Flatten and sort output list by scene, then id
all_pokemon = []
for scene_id in sorted(scene_pokemon.keys()):
    all_pokemon.extend(sorted(scene_pokemon[scene_id], key=lambda x: x["id"]))

# Write to pokemon.json
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(all_pokemon, f, ensure_ascii=False, indent=2)

print(f"pokemon.json written with {len(all_pokemon)} entries assigned to regions by type.")
