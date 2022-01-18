import archstoneIcon from 'assets/world/icons/archstone.png';
import badgeTraderObj from 'assets/world/objects/badgeTrader.png';
import wizardObj from 'assets/world/objects/wizard.png';
import samObj from 'assets/world/objects/sam.png';
import bankerObj from 'assets/world/objects/banker.png';
import blacksmithObj from 'assets/world/objects/blacksmith.png';
import chefObj from 'assets/world/objects/chef.png';
import collectorObj from 'assets/world/objects/collector.png';
import maxillaObj from 'assets/world/objects/maxilla.png';
import shopkeeperObj from 'assets/world/objects/shopkeeper.png';
import barrelBobObj from 'assets/world/objects/barrelBob.png';
import comedianFishObj from 'assets/world/objects/comedianFish.png';
import lennyObj from 'assets/world/objects/lenny.png';
import greatSlimeObj from 'assets/world/objects/greatSlime.png';
import mongoObj from 'assets/world/objects/mongo.png';
import ghostCrabObj from 'assets/world/objects/ghostCrab.png';
import frankenslimeObj from 'assets/world/objects/frankenslime.png';
import queenDunewormObj from 'assets/world/objects/queenDuneworm.png';
import crabbyPatObj from 'assets/world/objects/crabbyPat.png';
import clayManObj from 'assets/world/objects/clayMan.png';
import soulSerpentObj from 'assets/world/objects/soulSerpent.png';
import fallenPharaohObj from 'assets/world/objects/fallenPharaoh.png';
import exiledWizardObj from 'assets/world/objects/exiledWizard.png';
import rottedKingObj from 'assets/world/objects/rottedKing.png';
import grovesBlightObj from 'assets/world/objects/grovesBlight.png';
import sunkenQueenObj from 'assets/world/objects/sunkenQueen.png';
import banishedExecutionerObj from 'assets/world/objects/banishedExecutioner.png';
import constructionChamberDoorObj from 'assets/world/objects/constructionChamberDoor.png';
import jungleEntranceObj from 'assets/world/objects/jungleEntrance.png';
import hellGuardianObj from 'assets/world/objects/hellGuardian.png';
import hellArenaObj from 'assets/world/objects/hellArena.png';
import pitEntranceObj from 'assets/world/objects/pitEntrance.png';
import oldKingObj from 'assets/world/objects/oldKing.png';
import bombObj from 'assets/world/objects/bomb.png';
import heart from 'assets/world/objects/heart.png';
import heartHalf from 'assets/world/objects/heartHalf.png';
import badgeSlot from 'assets/world/objects/badgeSlot.png';
import healingFlask from 'assets/world/objects/healingFlask.png';
import exclamationBubble from 'assets/world/objects/exclamationBubble.png';
import speechBubble from 'assets/world/objects/speechBubble.png';
import cradlewood from 'assets/customIcons/cradlewood.png';
import dustcrag from 'assets/customIcons/dustcrag.png';
import murkmire from 'assets/customIcons/murkmire.png';
import pinePeak from 'assets/customIcons/pinePeak.png';
import twistedCaverns from 'assets/customIcons/twistedCaverns.png';
import fungusGrotto from 'assets/customIcons/fungusGrotto.png';
import tanglegrove from 'assets/customIcons/tanglegrove.png';
import brinkreef from 'assets/customIcons/brinkreef.png';
import moltenRift from 'assets/customIcons/moltenRift.png';

export type StateMeta = {
	name: string;
	shortName?: string;
	value?: number;
	flags: string[];
	types?: number[];
	biomes?: number[];
	maps?: number[];
	sprite: string;
	secondarySprite?: string;
	nonCompletion?: boolean;
};

const WorldStateMeta: StateMeta[] = [
	{
		name: 'UNUSED Talked to Sam',
		shortName: 'UNUSED Talked',
		flags: ['n0'],
		types: [21],
		biomes: [], // Missing amberpath town biome
		sprite: samObj,
		secondarySprite: speechBubble,
		nonCompletion: true
	},
	{
		name: 'Talked to the Banker',
		shortName: 'Talked',
		flags: ['n10'],
		types: [21, 22, 29],
		biomes: [45, 7, 12, 46, 26, 16, 48, 50],
		sprite: bankerObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Talked to the Shopkeeper',
		shortName: 'Talked',
		flags: ['n26'],
		types: [21, 22, 29],
		biomes: [45, 7, 12, 46, 26, 16, 48, 50],
		sprite: shopkeeperObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Talked to the Chef',
		shortName: 'Talked',
		flags: ['n12'],
		types: [22],
		biomes: [45],
		sprite: chefObj,
		secondarySprite: speechBubble,
		nonCompletion: true
	},
	{
		name: 'Fully upgraded healing brew',
		shortName: 'Fully upgraded',
		value: 2,
		flags: ['n12'],
		types: [22],
		biomes: [45],
		sprite: chefObj,
		secondarySprite: healingFlask
	},
	{
		name: 'Talked to the Blacksmith',
		shortName: 'Talked',
		flags: ['n24'],
		types: [22],
		biomes: [45],
		sprite: blacksmithObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Talked to the Collector',
		shortName: 'Talked',
		flags: ['n25'],
		types: [22],
		biomes: [45],
		sprite: collectorObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Talked to the Wizard',
		shortName: 'Talked',
		flags: ['n30'],
		types: [22],
		biomes: [45],
		sprite: wizardObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Talked to Barrel Bob',
		shortName: 'Talked',
		flags: ['n23'],
		types: [21],
		biomes: [7],
		sprite: barrelBobObj,
		secondarySprite: speechBubble,
		nonCompletion: true
	},
	{
		name: 'Heard the 1st joke from the Comedian fish',
		shortName: '1st joke',
		flags: ['n22'],
		types: [21],
		biomes: [47],
		sprite: comedianFishObj,
		secondarySprite: speechBubble,
		nonCompletion: true
	},
	{
		name: 'Heard the 2nd joke from the Comedian fish',
		shortName: '2nd joke',
		flags: ['n22'],
		value: 2,
		types: [21],
		biomes: [47],
		sprite: comedianFishObj,
		secondarySprite: speechBubble,
		nonCompletion: true
	},
	{
		name: 'Talked to the Clay Man',
		shortName: 'Talked',
		flags: ['n28'],
		types: [70],
		biomes: [29],
		sprite: clayManObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Talked to Crabby Pat',
		shortName: 'Talked',
		flags: ['n29'],
		types: [70],
		biomes: [8],
		sprite: crabbyPatObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Fairreach Bank',
		shortName: 'Fairreach',
		flags: ['n20001'],
		types: [22],
		biomes: [45],
		sprite: bankerObj,
		secondarySprite: cradlewood
	},
	{
		name: "Buckler's cove Bank",
		shortName: "Buckler's cove",
		flags: ['n20007'],
		types: [21],
		biomes: [7],
		sprite: bankerObj,
		secondarySprite: dustcrag
	},
	{
		name: 'Bogtown Bank',
		shortName: 'Bogtown',
		flags: ['n20002'],
		types: [21],
		biomes: [12],
		sprite: bankerObj,
		secondarySprite: murkmire
	},
	{
		name: 'Sprucepoint Bank',
		shortName: 'Sprucepoint',
		flags: ['n20006'],
		types: [21],
		biomes: [46],
		sprite: bankerObj,
		secondarySprite: pinePeak
	},
	{
		name: 'Chamberstone Bank',
		shortName: 'Chamberstone',
		flags: ['n20003'],
		types: [21],
		biomes: [26],
		sprite: bankerObj,
		secondarySprite: twistedCaverns
	},
	{
		name: 'Morelton Bank',
		shortName: 'Morelton',
		flags: ['n20008'],
		types: [21],
		biomes: [16],
		sprite: bankerObj,
		secondarySprite: fungusGrotto
	},
	{
		name: 'Pearlloch Bank',
		shortName: 'Pearlloch',
		flags: ['n20005'],
		types: [21],
		biomes: [48],
		sprite: bankerObj,
		secondarySprite: brinkreef
	},
	{
		name: 'The Pit Bank',
		shortName: 'The Pit',
		flags: ['n20004'],
		types: [29],
		biomes: [50],
		sprite: bankerObj,
		secondarySprite: moltenRift
	},
	{
		name: 'Shopkeeper new items',
		shortName: 'New items',
		flags: ['n21001'],
		types: [21, 22, 29],
		biomes: [45, 7, 12, 46, 26, 16, 48, 50],
		sprite: shopkeeperObj,
		secondarySprite: exclamationBubble,
		nonCompletion: true
	},
	{
		name: 'Fairreach Shopkeeper',
		shortName: 'Fairreach',
		flags: ['n21002'],
		types: [22],
		biomes: [45],
		sprite: shopkeeperObj,
		secondarySprite: cradlewood
	},
	{
		name: "Buckler's cove Shopkeeper",
		shortName: "Buckler's cove",
		flags: ['n21003'],
		types: [21],
		biomes: [7],
		sprite: shopkeeperObj,
		secondarySprite: dustcrag
	},
	{
		name: "Buckler's cove Shopkeeper Half-Heart",
		shortName: 'Half-Heart',
		flags: ['n60003'],
		types: [21],
		biomes: [7],
		sprite: shopkeeperObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Bogtown Shopkeeper',
		shortName: 'Bogtown',
		flags: ['n21004'],
		types: [21],
		biomes: [12],
		sprite: shopkeeperObj,
		secondarySprite: murkmire
	},
	{
		name: 'Bogtown Shopkeeper Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n60001'],
		types: [21],
		biomes: [12],
		sprite: shopkeeperObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Sprucepoint Shopkeeper',
		shortName: 'Sprucepoint',
		flags: ['n21005'],
		types: [21],
		biomes: [46],
		sprite: shopkeeperObj,
		secondarySprite: pinePeak
	},
	{
		name: 'Sprucepoint Shopkeeper Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n60002'],
		types: [21],
		biomes: [46],
		sprite: shopkeeperObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Chamberstone Shopkeeper',
		shortName: 'Chamberstone',
		flags: ['n21006'],
		types: [21],
		biomes: [26],
		sprite: shopkeeperObj,
		secondarySprite: twistedCaverns
	},
	{
		name: 'UNUSED Chamberstone Shopkeeper Half-Heart',
		shortName: 'UNUSED Half-Heart',
		flags: ['n60012'],
		types: [21],
		biomes: [26],
		sprite: shopkeeperObj,
		secondarySprite: heartHalf,
		nonCompletion: true
	},
	{
		name: 'Morelton Shopkeeper',
		shortName: 'Morelton',
		flags: ['n21009'],
		types: [21],
		biomes: [16],
		sprite: shopkeeperObj,
		secondarySprite: fungusGrotto
	},
	{
		name: 'Pearlloch Shopkeeper',
		shortName: 'Pearlloch',
		flags: ['n21008'],
		types: [21],
		biomes: [48],
		sprite: shopkeeperObj,
		secondarySprite: brinkreef
	},
	{
		name: 'Pearlloch Shopkeeper Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n60005'],
		types: [21],
		biomes: [48],
		sprite: shopkeeperObj,
		secondarySprite: heartHalf
	},
	{
		name: 'The Pit Shopkeeper',
		shortName: 'The Pit',
		flags: ['n21007'],
		types: [29],
		biomes: [50],
		sprite: shopkeeperObj,
		secondarySprite: moltenRift
	},
	{
		name: 'The Pit Shopkeeper Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n60004'],
		types: [29],
		biomes: [50],
		sprite: shopkeeperObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Badge trader new items',
		shortName: 'New items',
		flags: ['n21010'],
		types: [21, 22, 29],
		biomes: [45, 7, 12, 46, 26, 48, 50],
		sprite: badgeTraderObj,
		secondarySprite: exclamationBubble,
		nonCompletion: true
	},
	{
		name: 'Fairreach Badge trader',
		shortName: 'Fairreach',
		flags: ['n21011'],
		types: [22],
		biomes: [45],
		sprite: badgeTraderObj,
		secondarySprite: cradlewood
	},
	{
		name: "Buckler's cove Badge trader",
		shortName: "Buckler's cove",
		flags: ['n21012'],
		types: [21],
		biomes: [7],
		sprite: badgeTraderObj,
		secondarySprite: dustcrag
	},
	{
		name: "Buckler's cove Badge trader Badge Slot",
		shortName: 'Badge Slot',
		flags: ['n60008'],
		types: [21],
		biomes: [7],
		sprite: badgeTraderObj,
		secondarySprite: badgeSlot
	},
	{
		name: 'Bogtown Badge trader',
		shortName: 'Bogtown',
		flags: ['n21013'],
		types: [21],
		biomes: [12],
		sprite: badgeTraderObj,
		secondarySprite: murkmire
	},
	{
		name: 'Bogtown Badge trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60006'],
		types: [21],
		biomes: [12],
		sprite: badgeTraderObj,
		secondarySprite: badgeSlot
	},
	{
		name: 'Sprucepoint Badge trader',
		shortName: 'Sprucepoint',
		flags: ['n21014'],
		types: [21],
		biomes: [46],
		sprite: badgeTraderObj,
		secondarySprite: pinePeak
	},
	{
		name: 'Sprucepoint Badge trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60007'],
		types: [21],
		biomes: [46],
		sprite: badgeTraderObj,
		secondarySprite: badgeSlot
	},
	{
		name: 'Chamberstone Badge trader',
		shortName: 'Chamberstone',
		flags: ['n21015'],
		types: [21],
		biomes: [26],
		sprite: badgeTraderObj,
		secondarySprite: twistedCaverns
	},
	{
		name: 'Chamberstone trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60009'],
		types: [21],
		biomes: [26],
		sprite: badgeTraderObj,
		secondarySprite: badgeSlot
	},
	{
		name: 'Pearlloch Badge trader',
		shortName: 'Pearlloch',
		flags: ['n21016'],
		types: [21],
		biomes: [48],
		sprite: badgeTraderObj,
		secondarySprite: brinkreef
	},
	{
		name: 'Pearlloch trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60011'],
		types: [21],
		biomes: [48],
		sprite: badgeTraderObj,
		secondarySprite: badgeSlot
	},
	{
		name: 'The Pit Badge trader',
		shortName: 'The Pit',
		flags: ['n21017'],
		types: [29],
		biomes: [50],
		sprite: badgeTraderObj,
		secondarySprite: moltenRift
	},
	{
		name: 'The Pit trader Badge Slot',
		shortName: 'Badge Slot',
		flags: ['n60010'],
		types: [29],
		biomes: [50],
		sprite: badgeTraderObj,
		secondarySprite: badgeSlot
	},
	{
		name: 'Great Slime',
		flags: ['n30003'],
		types: [1],
		biomes: [1],
		sprite: greatSlimeObj
	},
	{
		name: 'Great Slime Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31003'],
		types: [1],
		biomes: [1],
		sprite: greatSlimeObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Mongo',
		flags: ['n30001'],
		types: [1],
		biomes: [23],
		sprite: mongoObj
	},
	{
		name: 'Mongo Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31001'],
		types: [1],
		biomes: [23],
		sprite: mongoObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Ghost Crab',
		flags: ['n30004'],
		types: [1],
		biomes: [8],
		sprite: ghostCrabObj
	},
	{
		name: 'Ghost Crab Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31004'],
		types: [1],
		biomes: [8],
		sprite: ghostCrabObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Queen Duneworm',
		flags: ['n30005'],
		types: [1],
		biomes: [5],
		sprite: queenDunewormObj
	},
	{
		name: 'Queen Duneworm Crab Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31006'],
		types: [1],
		biomes: [5],
		sprite: queenDunewormObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Soul Serpent',
		flags: ['n30002'],
		types: [1],
		biomes: [10],
		sprite: soulSerpentObj
	},
	{
		name: 'Soul Serpent Crab Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31002'],
		types: [1],
		biomes: [10],
		sprite: soulSerpentObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Frankenslime',
		flags: ['n30006'],
		types: [1],
		biomes: [25],
		sprite: frankenslimeObj
	},
	{
		name: 'Frankenslime Crab Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31005'],
		types: [1],
		biomes: [25],
		sprite: frankenslimeObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Talked to Maxilla',
		shortName: 'Talked',
		flags: ['n50001'],
		types: [1],
		maps: [0],
		sprite: maxillaObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Maxilla',
		flags: ['n30007'],
		types: [1],
		maps: [0],
		sprite: maxillaObj
	},
	{
		name: 'Maxilla Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31007'],
		types: [1],
		maps: [0],
		sprite: maxillaObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Maxilla Potion',
		shortName: 'Potion',
		flags: ['n32001'],
		types: [1],
		maps: [0],
		sprite: maxillaObj,
		secondarySprite: healingFlask
	},
	{
		name: 'Fallen Pharaoh',
		flags: ['n30008'],
		types: [1],
		maps: [1],
		sprite: fallenPharaohObj
	},
	{
		name: 'Fallen Pharaoh Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31008'],
		types: [1],
		maps: [1],
		sprite: fallenPharaohObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Fallen Pharaoh Potion',
		shortName: 'Potion',
		flags: ['n32002'],
		types: [1],
		maps: [1],
		sprite: fallenPharaohObj,
		secondarySprite: healingFlask
	},
	{
		name: 'Exiled Wizard',
		flags: ['n30009'],
		types: [1],
		maps: [2],
		sprite: exiledWizardObj
	},
	{
		name: 'Exiled Wizard Half-Heart',
		shortName: 'Half-Heart',
		flags: ['n31009'],
		types: [1],
		maps: [2],
		sprite: exiledWizardObj,
		secondarySprite: heartHalf
	},
	{
		name: 'Exiled Wizard Potion',
		shortName: 'Potion',
		flags: ['n32003'],
		types: [1],
		maps: [2],
		sprite: exiledWizardObj,
		secondarySprite: healingFlask
	},
	{
		name: 'Talked to the Rotted King',
		shortName: 'Talked',
		flags: ['n50005'],
		types: [1],
		maps: [4],
		sprite: rottedKingObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Rotted King',
		flags: ['n30011'],
		types: [1],
		maps: [4],
		sprite: rottedKingObj
	},
	{
		name: 'Rotted King Heart',
		shortName: 'Heart',
		flags: ['n31011'],
		types: [1],
		maps: [4],
		sprite: rottedKingObj,
		secondarySprite: heart
	},
	{
		name: 'Rotted King Potion',
		shortName: 'Potion',
		flags: ['n32005'],
		types: [1],
		maps: [4],
		sprite: rottedKingObj,
		secondarySprite: healingFlask
	},
	{
		name: "Grove's Blight",
		flags: ['n30010'],
		types: [1],
		maps: [3],
		sprite: grovesBlightObj
	},
	{
		name: "Grove's Blight Heart",
		shortName: 'Heart',
		flags: ['n31010'],
		types: [1],
		maps: [3],
		sprite: grovesBlightObj,
		secondarySprite: heart
	},
	{
		name: "Grove's Blight Potion",
		shortName: 'Potion',
		flags: ['n32004'],
		types: [1],
		maps: [3],
		sprite: grovesBlightObj,
		secondarySprite: healingFlask
	},
	{
		name: 'Talked to the Sunken Queen',
		shortName: 'Talked',
		flags: ['n50007'],
		types: [1],
		maps: [6],
		sprite: sunkenQueenObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Sunken Queen',
		flags: ['n30013'],
		types: [1],
		maps: [6],
		sprite: sunkenQueenObj
	},
	{
		name: 'Sunken Queen Heart',
		shortName: 'Heart',
		flags: ['n31013'],
		types: [1],
		maps: [6],
		sprite: sunkenQueenObj,
		secondarySprite: heart
	},
	{
		name: 'Sunken Queen Potion',
		shortName: 'Potion',
		flags: ['n0'], // n32007
		types: [1],
		maps: [6],
		sprite: sunkenQueenObj,
		secondarySprite: healingFlask
	},
	{
		name: 'Banished Executioner',
		flags: ['n30012'],
		types: [1],
		maps: [5],
		sprite: banishedExecutionerObj
	},
	{
		name: 'Banished Executioner Heart',
		shortName: 'Heart',
		flags: ['n31012'],
		types: [1],
		maps: [5],
		sprite: banishedExecutionerObj,
		secondarySprite: heart
	},
	{
		name: 'Banished Executioner Potion',
		shortName: 'Potion',
		flags: ['n32006'],
		types: [1],
		maps: [5],
		sprite: banishedExecutionerObj,
		secondarySprite: healingFlask
	},
	{
		name: 'Talked to the Old King',
		shortName: 'Talked',
		flags: ['n50008'],
		types: [1],
		maps: [7],
		sprite: oldKingObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Bomb',
		flags: ['n50106'],
		types: [-2],
		sprite: bombObj
	},
	{
		name: '1st Archstone',
		shortName: 'Lichen Keep',
		flags: ['n40001', 'n10005'],
		types: [-1, 47],
		biomes: [1],
		maps: [-1, 0],
		sprite: archstoneIcon,
		secondarySprite: cradlewood
	},
	{
		name: '2nd Archstone',
		shortName: 'Tomb of Kings',
		flags: ['n40002'],
		types: [-1, 47],
		biomes: [5],
		maps: [-1, 1],
		sprite: archstoneIcon,
		secondarySprite: dustcrag
	},
	{
		name: '3rd Archstone',
		shortName: 'Crystal Atheneum',
		flags: ['n40003'],
		types: [-1, 47],
		biomes: [13],
		maps: [-1, 2],
		sprite: archstoneIcon,
		secondarySprite: pinePeak
	},
	{
		name: '4th Archstone',
		shortName: 'Agarica Palace',
		flags: ['n40005'],
		types: [-1, 47],
		biomes: [16],
		maps: [-1, 4],
		sprite: archstoneIcon,
		secondarySprite: fungusGrotto
	},
	{
		name: '5th Archstone',
		shortName: 'Temple of Groveheart',
		flags: ['n40004'],
		types: [-1, 47],
		biomes: [29],
		maps: [-1, 3],
		sprite: archstoneIcon,
		secondarySprite: tanglegrove
	},
	{
		name: '6th Archstone',
		shortName: 'Drowned Mausoleum',
		flags: ['n40007'],
		types: [-1, 47],
		biomes: [47],
		maps: [-1, 6],
		sprite: archstoneIcon,
		secondarySprite: brinkreef
	},
	{
		name: '7th Archstone',
		shortName: "The Executioner's Lair",
		flags: ['n40006'],
		types: [-1, 47],
		biomes: [49],
		maps: [-1, 5],
		sprite: archstoneIcon,
		secondarySprite: moltenRift
	},
	{
		name: 'Tanglegrove entrance challenge done',
		shortName: 'Tanglegrove entrance',
		flags: ['n10001'],
		types: [63],
		biomes: [29],
		sprite: jungleEntranceObj
	},
	{
		name: 'Talked to Lenny',
		shortName: 'Talked',
		flags: ['n27'],
		types: [21],
		biomes: [7],
		sprite: lennyObj,
		secondarySprite: speechBubble,
		nonCompletion: true
	},
	{
		name: 'Given 10 Living Vines to Lenny',
		shortName: 'Brinkreef entrance',
		value: 2,
		flags: ['n27'],
		types: [21],
		biomes: [7],
		sprite: lennyObj
	},
	{
		name: 'Molten Rift entrance challenge done',
		shortName: 'Molten Rift entrance',
		flags: ['n10002'],
		types: [66],
		biomes: [49],
		sprite: hellGuardianObj
	},
	{
		name: 'Arena entrance guardian talked to',
		shortName: 'Talked',
		value: 2,
		flags: ['n10004'],
		types: [29],
		biomes: [50],
		sprite: hellGuardianObj,
		secondarySprite: speechBubble
	},
	{
		name: 'Beaten Molten Rift arena',
		shortName: 'Arena beaten',
		flags: ['n10003'],
		types: [29],
		biomes: [50],
		sprite: hellArenaObj
	},
	{
		name: "Talked to the Executioner's Lair entrance guardian",
		shortName: 'Talked',
		value: 2,
		flags: ['n13'],
		types: [47],
		biomes: [49],
		sprite: hellGuardianObj,
		secondarySprite: speechBubble,
		nonCompletion: true
	},
	{
		name: "Executioner's Lair entrance",
		shortName: 'Opened',
		value: 3,
		flags: ['n13'],
		types: [47],
		biomes: [49],
		sprite: pitEntranceObj
	},
	{
		name: 'Construction Chamber Opened',
		shortName: 'Opened',
		flags: ['n40008'],
		types: [47],
		biomes: [25],
		sprite: constructionChamberDoorObj
	}
];

export default WorldStateMeta;
