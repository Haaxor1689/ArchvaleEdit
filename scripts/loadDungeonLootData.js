const fs = require('fs');
const yaml = require('js-yaml');

const objectExports = `
rm_dungeon_d7_5_9,o_dkey
rm_dungeon_d1_4_5,o_dkey
rm_dungeon_d4_2_6,o_dkey
gml_RoomCC_rm_dungeon_d1_2_3_0_PreCreate,o_dkey
gml_RoomCC_rm_dungeon_d2_6_3_0_PreCreate,o_dkey_silver
gml_RoomCC_rm_dungeon_d2_3_3_0_PreCreate,o_dkey_silver
gml_RoomCC_rm_dungeon_d2_0_3_0_PreCreate,o_dkey_silver
rm_dungeon_d2_4_4,o_dkey_silver
gml_RoomCC_rm_dungeon_d1_3_2_1_PreCreate,o_dkey_silver
gml_RoomCC_rm_dungeon_d1_3_3_2_PreCreate,o_dkey_silver
rm_tut_3_2,o_dkey_plate
gml_RoomCC_rm_dungeon_d4_4_7_4_PreCreate,o_dkey_plate
rm_dungeon_d6_1_2,o_dkey_plate
rm_dungeon_d2_5_3,o_dkey_plate
gml_RoomCC_rm_dungeon_d2_3_3_3_PreCreate,o_dkey_plate
rm_dungeon_d4_3_8,o_dkey_plate
gml_RoomCC_rm_dungeon_d4_3_8_2_PreCreate,o_dkey_plate
gml_RoomCC_rm_dungeon_d4_3_8_3_PreCreate,o_dkey_plate
gml_RoomCC_rm_dungeon_d4_3_8_4_PreCreate,o_dkey_plate
gml_RoomCC_rm_dungeon_d3_7_8_0_PreCreate,o_dkey_plate
gml_RoomCC_rm_dungeon_d4_2_7_1_PreCreate,o_dkey_plate
gml_RoomCC_rm_dungeon_d2_6_1_1_PreCreate,o_dkey_plate
gml_RoomCC_rm_dungeon_d2_4_2_4_PreCreate,o_dkey_plate
gml_RoomCC_rm_dungeon_d1_3_3_1_PreCreate,o_dkey_plate
rm_dungeon_d1_5_5,o_dkey_port
gml_RoomCC_rm_dungeon_d4_4_7_1_PreCreate,o_dkey_port
rm_dungeon_d7_4_10,o_dkey_port
gml_RoomCC_rm_dungeon_d1_4_3_3_PreCreate,o_dkey_port
gml_RoomCC_rm_dungeon_d2_2_3_1_PreCreate,o_dkey_port_silver
gml_RoomCC_rm_dungeon_d2_3_5_2_PreCreate,o_dkey_port_silver
gml_RoomCC_rm_dungeon_d1_3_4_1_PreCreate,o_dkey_port_silver
gml_RoomCC_rm_dungeon_d2_3_4_1_PreCreate,o_dkey_port_silver
gml_RoomCC_rm_dungeon_d2_6_1_4_PreCreate,o_dkey_port_silver
gml_RoomCC_rm_dungeon_d1_4_3_0_PreCreate,o_dkey_port_silver
rm_dungeon_d1_1_4,o_dobject_plum
gml_RoomCC_rm_dungeon_d4_4_7_2_PreCreate,o_dobject_plum
gml_RoomCC_rm_dungeon_d5_1_6_0_PreCreate,o_dobject_plum
gml_RoomCC_rm_dungeon_d2_3_6_0_PreCreate,o_dobject_plum
gml_RoomCC_rm_dungeon_d3_4_6_0_PreCreate,o_dobject_plum
gml_RoomCC_rm_dungeon_d4_7_7_0_PreCreate,o_dobject_chest_ring
gml_RoomCC_rm_dungeon_d1_4_2_0_PreCreate,o_dobject_chest_ring
gml_RoomCC_rm_dungeon_d5_1_3_0_PreCreate,o_dobject_chest_ring
gml_RoomCC_rm_dungeon_d6_1_2_0_PreCreate,o_dobject_chest_ring
gml_RoomCC_rm_dungeon_d2_3_5_0_PreCreate,o_dobject_chest_ring
gml_RoomCC_rm_dungeon_d7_4_3_2_PreCreate,o_dobject_chest_ring
gml_RoomCC_rm_dungeon_d3_12_6_0_PreCreate,o_dobject_chest_ring
gml_RoomCC_rm_dungeon_d4_3_4_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d2_1_4_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d2_5_1_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d1_4_2_1_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d2_3_3_2_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d3_6_5_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d7_6_6_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d5_1_7_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d5_1_7_1_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d7_4_5_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d1_3_2_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d1_6_5_0_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d4_4_5_1_PreCreate,o_dobject_chest_treasure
gml_RoomCC_rm_dungeon_d3_11_3_0_PreCreate,o_dobject_blessing_damage
gml_RoomCC_rm_dungeon_d2_6_1_2_PreCreate,o_dobject_blessing_damage
rm_dungeon_d4_2_8,o_dobject_blessing_damage
gml_RoomCC_rm_dungeon_d1_6_3_0_PreCreate,o_dobject_blessing_damage

`
	.split('\n')
	.filter(v => v)
	.map(v => v.split(','))
	.map(([f, obj]) => {
		const file = f.match('gml_RoomCC')
			? fs.readFileSync(`./../_Archvale/Export/Export_code/${f}.gml`).toString()
			: '';
		return {
			f,
			obj,
			lock_index:
				!file && obj === 'o_dkey_plate'
					? 0
					: file.match(/lock_index = \(?(\d+)/)?.[1],
			key_index:
				!file && ['o_dkey', 'o_dkey_silver'].indexOf(obj) >= 0
					? 0
					: file.match(/key_index = \(?(\d+)/)?.[1],
			lock_id:
				!file && ['o_dkey_port', 'o_dkey_port_silver'].indexOf(obj) >= 0
					? 0
					: file.match(/lock_id = \(?(\d+)/)?.[1],
			dungeon_loot_id:
				!file &&
				[
					'o_dobject_blessing_damage',
					'o_dobject_chest_treasure',
					'o_dobject_chest_ring',
					'o_dobject_plum'
				].indexOf(obj) >= 0
					? 0
					: file.match(/dungeon_loot_id = \(?(\d+)/)?.[1],
			item_id: file?.match(/item_id = \(?(\d+)/)?.[1],
			treasure_tier: file?.match(/treasure_tier = \(?(\d+)/)?.[1]
		};
	});

const dungeons = yaml
	.load(fs.readFileSync('src/utils/data/dungeons.yaml').toString())
	.filter(f => f);

const newDungeons = dungeons.map(d => ({
	...d,
	rooms: d.rooms.map(r => {
		const obj = objectExports.filter(v =>
			v.f.match(`_d${d.id + 1}_${r.x}_${r.y}`)
		);

		const keys = obj
			.map(o =>
				o.key_index !== undefined
					? [Number(o.key_index), o.obj === 'o_dkey_silver' ? 'silver' : 'boss']
					: undefined
			)
			.filter(v => v);

		const locks = obj
			.map(o =>
				o.lock_id !== undefined
					? [
							Number(o.lock_id),
							o.obj === 'o_dkey_port_silver' ? 'silver' : 'boss'
					  ]
					: o.lock_index !== undefined && o.obj === 'o_dkey_plate'
					? [Number(o.lock_index), 'plate']
					: undefined
			)
			.filter(v => v);

		const loot = obj
			.map(o =>
				o.dungeon_loot_id !== undefined
					? [
							Number(o.dungeon_loot_id),
							o.obj === 'o_dobject_blessing_damage'
								? -1
								: o.obj === 'o_dobject_plum'
								? 26
								: o.obj === 'o_dobject_chest_treasure'
								? 900 + 4 * Number(o.treasure_tier ?? 0)
								: Number(o.item_id)
					  ]
					: undefined
			)
			.filter(v => v);

		const type = [
			...(Array.isArray(r.type) ? r.type : [r.type]).filter(
				v => [-3, -4, -5, -6, -7, 20].indexOf(v) < 0
			),
			loot.find(l => l[1] > 26 && l[1] < 900) ? -4 : undefined,
			loot.find(l => l[1] === 26) ? 20 : undefined,
			loot.find(l => l[1] === -1) ? -3 : undefined,
			keys.find(l => l[1] === 'boss') ? -6 : undefined,
			keys.find(l => l[1] === 'silver') ? -7 : undefined,
			loot.find(l => l[1] >= 900) ? -5 : undefined
		].filter(v => v !== undefined);
		type.length > 2 && console.log(r);

		return {
			...r,
			type: type.length === 0 ? undefined : type.length === 1 ? type[0] : type,
			keys: keys.length ? keys : undefined,
			locks: locks.length ? locks : undefined,
			loot: loot.length ? loot : undefined
		};
	})
}));

fs.writeFileSync(
	'src/utils/data/dungeons.yaml',
	yaml.dump(newDungeons, { flowLevel: 5 })
);
