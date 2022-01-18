import archstoneIcon from 'assets/world/icons/archstone.png';
import dungeonIcon from 'assets/world/icons/dungeon.png';
import arenaIcon from 'assets/world/icons/arena.png';
import archIcon from 'assets/world/icons/arch.png';
import mapIcon from 'assets/world/icons/map.png';
import dungeonChestIcon from 'assets/world/icons/dungeonChest.png';
import dungeonTreasureIcon from 'assets/world/icons/dungeonTreasure.png';
import silverKeyIcon from 'assets/world/icons/silverKey.png';
import bossKeyIcon from 'assets/world/icons/bossKey.png';
import bombIcon from 'assets/world/icons/bomb.png';
import fountainIcon from 'assets/world/icons/fountain.png';
import questIcon from 'assets/world/icons/quest.png';
import anvilIcon from 'assets/world/icons/anvil.png';
import arrRight from 'assets/world/icons/arrRight.png';
import arrUp from 'assets/world/icons/arrUp.png';
import arrDown from 'assets/world/icons/arrDown.png';
import minibossIcon from 'assets/world/icons/miniboss.png';
import damageBlessingIcon from 'assets/world/damageBlessing.png';
import plumIcon from 'assets/world/icons/plum.png';
import shrineIcon from 'assets/world/icons/shrine.png';
import townIcon from 'assets/world/icons/town.png';
import treasureIcon from 'assets/world/icons/treasure.png';

type RoomType = {
	sprite?: string;
	name: string;
};

// TODO: Show custom room requirements
const RoomTypes: Record<number, RoomType> = {
	[-7]: { sprite: silverKeyIcon, name: 'Silver Key' },
	[-6]: { sprite: bossKeyIcon, name: 'Boss Key' },
	[-5]: { sprite: dungeonTreasureIcon, name: 'Dungeon Treasure' },
	[-4]: { sprite: dungeonChestIcon, name: 'Dungeon Ring' },
	[-3]: { sprite: damageBlessingIcon, name: 'Damage Blessing' },
	[-2]: { sprite: bombIcon, name: 'Bomb unlock' },
	[-1]: { sprite: archstoneIcon, name: 'Archstone' },
	0: { name: 'Combat' },
	1: { sprite: minibossIcon, name: 'Boss' }, // boss
	2: { sprite: fountainIcon, name: 'Starting Fountain' }, // spawn
	// 3: instant crash
	4: { sprite: treasureIcon, name: 'Treasure' }, // treasure
	// 5: ???
	// 6: instant crash
	7: { sprite: questIcon, name: 'UNUSED Ladder' }, // portal1 (crashes)
	8: { sprite: townIcon, name: 'UNUSED Home' }, // home
	9: { sprite: archIcon, name: 'UNUSED Arch' }, // arch
	10: { sprite: fountainIcon, name: 'Fountain' }, // save
	// 11: { sprite: questIcon, name: 'UNUSED Teleport' }, // teleport (crashes)
	12: { sprite: bombIcon, name: 'Bomb Power' }, // bombup
	// 13: { sprite: questIcon, name: 'UNUSED Town teleport' }, // town_teleport (crashes)
	// 14: { sprite: questIcon, name: 'UNUSED Town Fountain' }, // town_save (crashes)
	15: { sprite: anvilIcon, name: 'UNUSED Forge' }, // town_forge
	// 16: { sprite: questIcon, name: 'UNUSED Town Shop' }, // town_shop (crashes)
	// 17: town bank, crashes
	18: { sprite: questIcon, name: 'UNUSED Magic shop' }, // shop
	19: { sprite: questIcon, name: 'UNUSED Sam' }, // sam
	20: { sprite: plumIcon, name: 'Mega Plum' }, // plum
	21: { sprite: townIcon, name: 'Town' }, // town
	22: { sprite: townIcon, name: 'Town (Fairreach)' }, // town_primary
	25: { sprite: mapIcon, name: 'UNUSED Map' }, // map
	26: { sprite: shrineIcon, name: 'Shrine A' }, // lib_a
	27: { sprite: shrineIcon, name: 'Shrine B' }, // lib_b
	29: { sprite: townIcon, name: 'Town (The Pit)' }, // arena
	31: { sprite: questIcon, name: 'UNUSED Tower' }, // tower (crashes)
	// 34: { sprite: questIcon, name: 'UNUSED Heart' }, // heart (crashes)
	// 35: { sprite: questIcon, name: 'UNUSED Ore' }, // ore (crashes)
	// 37: { sprite: questIcon, name: 'UNUSED Heal Power' }, // healup (crashes)
	38: { sprite: questIcon, name: 'UNUSED Witch' }, // witch (crashes)
	40: { sprite: questIcon, name: 'UNUSED Camp easy' }, // camp_easy (requires arena trigger object)
	41: { sprite: arenaIcon, name: 'Camp' }, // camp_medium (requires arena trigger object)
	// 42: { sprite: questIcon, name: '42 ???' },
	46: { sprite: questIcon, name: 'UNUSED Boss' }, // boss (crashes)
	47: { sprite: dungeonIcon, name: 'Dungeon' }, // dungeon
	// 48: { sprite: questIcon, name: 'UNUSED Camp' }, // camp (crashes)
	51: { sprite: questIcon, name: 'UNUSED Dungeon entrance' }, // dungeon_entrance (crashes)
	52: { sprite: questIcon, name: 'UNUSED Main' }, // main (crashes)
	// 53: instant crash
	54: { sprite: questIcon, name: 'UNUSED Food court' }, // foodcourt (crashes)
	55: { sprite: questIcon, name: 'UNUSED Boss entrance' }, // bossentrance (crashes)
	56: { sprite: questIcon, name: 'UNUSED Boss room' }, // bossroom (crashes)
	57: { sprite: treasureIcon, name: 'UNUSED Treasure' }, // treasure
	58: { sprite: anvilIcon, name: 'UNUSED Spell Pillar' }, // spell
	59: { sprite: arrUp, name: 'Amberpath border' }, // border_glade
	// 60: { sprite: questIcon, name: 'UNUSED Forest border' }, // border_forest (crashes)
	61: { sprite: arrRight, name: 'Crabclaw Chasm border' }, // border_cave
	62: { sprite: arrRight, name: 'Dustcrag border' }, // border_desert
	63: { sprite: arrUp, name: 'Murkmire border' }, // border_swamp
	64: { sprite: arrUp, name: 'UNUSED Ruins border' }, // border_temple
	65: { sprite: arrUp, name: 'Pine Peak border' }, // border_snow
	66: { sprite: arrRight, name: 'Twisted Caverns border' }, // border_cavern
	69: { sprite: arrDown, name: 'Tutorial exit' }, // tutorial_exit
	70: { sprite: questIcon, name: 'NPC' } // specialnpc
};

export default RoomTypes;
