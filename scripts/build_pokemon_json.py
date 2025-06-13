#!/usr/bin/env python3
"""
build_pokemon_json.py
---------------------

Generate **pokemon.json** with scene assignments based on Pokémon primary
types.  This runs at _build time_ (or occasionally during content updates)
and is **NOT** required for normal gameplay—the generated file is committed.

Key improvements
────────────────
• CLI arguments for input / output paths (`--pokedex`, `--scenes`, `--out`).
• Clear function boundaries for loading, assigning, and writing data.
• Deterministic assignment:  Pokémon are distributed to the scene with the fewest
  entries (then lowest scene-id) when no type match is found.
• Type annotations & early failure checks.
• Prints a concise summary when finished.
"""

from __future__ import annotations

import argparse
import json
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, TypedDict, Iterable, Tuple

# ———————————————————————————————————————————————————————————————————— types


class PokemonEntry(TypedDict):
    id: int
    name: str
    types: List[str]
    sprite: str
    image: str
    scene_id: int | None


class Scene(TypedDict):
    id: int
    name: str
    background: str
    word_start: int
    word_end: int


# —————————————————————————————————————————————————————————— cli helpers


def parse_args() -> argparse.Namespace:
    root = Path(__file__).resolve().parents[1]  # project root
    data_dir = root / "src" / "data"

    parser = argparse.ArgumentParser(description="Assign Pokémon to scenes.")
    parser.add_argument("--pokedex", type=Path, default=data_dir / "pokedex.json")
    parser.add_argument("--scenes", type=Path, default=data_dir / "scenes.json")
    parser.add_argument("--out", type=Path, default=data_dir / "pokemon.json")
    return parser.parse_args()


# ————————————————————————————————————————————————————————— assignment logic


# Scene-type themes (edit to taste)
SCENE_TYPE_MAP: list[Tuple[int, list[str]]] = [
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
    (13, ["Psychic", "Dragon"]),
]


def load_json(path: Path) -> list[dict]:
    if not path.exists():
        raise FileNotFoundError(path)
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def assign_pokemon(
    pokedex: Iterable[dict], scene_type_map: list[Tuple[int, list[str]]]
) -> list[PokemonEntry]:
    scene_pokemon: Dict[int, list[PokemonEntry]] = defaultdict(list)
    unassigned: list[PokemonEntry] = []

    for entry in pokedex:
        pid: int = entry["id"]
        name: str = entry["name"]["english"] if isinstance(entry["name"], dict) else entry["name"]
        types: list[str] = entry["type"] if isinstance(entry["type"], list) else [entry["type"]]
        primary = types[0]

        poke_dict: PokemonEntry = {
            "id": pid,
            "name": name,
            "types": types,
            "sprite": f"{pid:03d}MS.png",
            "image": f"{pid:03d}.png",
            "scene_id": None,
        }

        # try thematic assignment
        for scene_id, theme_types in scene_type_map:
            if primary in theme_types:
                poke_dict["scene_id"] = scene_id
                scene_pokemon[scene_id].append(poke_dict)
                break
        else:
            unassigned.append(poke_dict)

    return distribute_unassigned(unassigned, scene_pokemon)


def distribute_unassigned(
    unassigned: list[PokemonEntry], scene_pokemon: Dict[int, list[PokemonEntry]]
) -> list[PokemonEntry]:
    # If no unassigned, flatten and return quickly
    if not unassigned:
        return [p for plist in scene_pokemon.values() for p in plist]

    # Initialise counts
    counts = {sid: len(lst) for sid, lst in scene_pokemon.items()}

    # Deterministic order
    unassigned.sort(key=lambda p: p["id"])

    for mon in unassigned:
        # pick scene with fewest Pokémon, tie-break on id
        target_id = min(counts.items(), key=lambda item: (item[1], item[0]))[0]
        mon["scene_id"] = target_id
        scene_pokemon[target_id].append(mon)
        counts[target_id] = counts.get(target_id, 0) + 1

    return [p for plist in scene_pokemon.values() for p in plist]


def save_json(data: list[PokemonEntry], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# —————————————————————————————————————————————————————————————— main


def main() -> None:
    args = parse_args()

    pokedex_data = load_json(args.pokedex)
    _ = load_json(args.scenes)  # scenes currently unused but validated

    assigned: list[PokemonEntry] = assign_pokemon(pokedex_data, SCENE_TYPE_MAP)
    assigned.sort(key=lambda p: (p["scene_id"] or 0, p["id"]))

    save_json(assigned, args.out)
    print(f"Wrote {len(assigned)} Pokémon to {args.out.relative_to(Path.cwd())}")


if __name__ == "__main__":
    main()
