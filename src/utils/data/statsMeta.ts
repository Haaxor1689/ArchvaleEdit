import damageIcon from 'assets/stats/damage.png';
import rateIcon from 'assets/stats/rate.png';
import rangeIcon from 'assets/stats/range.png';
import arPenIcon from 'assets/stats/ar_pen.png';
import arBreakIcon from 'assets/stats/ar_break.png';
import burnIcon from 'assets/stats/burn.png';
import slowIcon from 'assets/stats/slow.png';
import exposeIcon from 'assets/stats/expose.png';
import protIcon from 'assets/stats/prot.png';
import poisonIcon from 'assets/stats/poison.png';
import bleedIcon from 'assets/stats/bleed.png';
import defIcon from 'assets/stats/def.png';
import spdIcon from 'assets/stats/spd.png';
import allDmgIcon from 'assets/stats/all_dmg.png';
import meleeDmgIcon from 'assets/stats/melee_dmg.png';
import rangeDmgIcon from 'assets/stats/range_dmg.png';
import magicDmgIcon from 'assets/stats/magic_dmg.png';
import atkSpdIcon from 'assets/stats/atk_spd.png';
import costIcon from 'assets/stats/cost.png';

type StatMeta = {
	icon: string;
	title?: string;
	getValue?: (v: number) => string;
};

const getPercent = (v: number) => `${v * 100}%`;
const getPlus = (v: number) => `${v < 0 ? '' : '+'}${v * 5}%`;
const getAtkSpd = (v: number) => `${v < 0 ? '' : '+'}${v * 2}%`;

const StatsMetadata: Record<string, StatMeta> = {
	damage: { icon: damageIcon },
	rate: { icon: rateIcon },
	range: { icon: rangeIcon },
	ar_pen: { icon: arPenIcon, title: 'Armour Pen.' },
	burn: { icon: burnIcon },
	bleed: { icon: bleedIcon },
	poison: { icon: poisonIcon },
	def: { icon: defIcon, title: 'Defense' },
	prot: { icon: protIcon, title: 'Protection' },
	spd: { icon: spdIcon, title: 'Speed', getValue: getPlus },
	all_dmg: { icon: allDmgIcon, title: 'Power', getValue: getPlus },
	melee_dmg: { icon: meleeDmgIcon, title: 'Melee DMG', getValue: getPlus },
	range_dmg: { icon: rangeDmgIcon, title: 'Ranged DMG', getValue: getPlus },
	magic_dmg: { icon: magicDmgIcon, title: 'Magical DMG', getValue: getPlus },
	atk_spd: { icon: atkSpdIcon, title: 'ATK Speed', getValue: getAtkSpd },
	cost: { icon: costIcon },
	ar_break: { icon: arBreakIcon, title: 'Armour Break', getValue: getPercent },
	slow: { icon: slowIcon, getValue: getPercent },
	expose: { icon: exposeIcon, getValue: getPercent }
};

export default StatsMetadata;
