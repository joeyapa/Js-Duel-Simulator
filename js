  /**
	 *  Basic duel performing alternate attacks
	 *  - duel that is purely based on stats
	 *  - the initial character swap allows the defender to perform the first attack
	 *  - the default EVA_FACTOR has the following evasion chances based on evasion difference: 10-63% 20-79% 30-95%
	 *  - ensure that the minumum damage is 1 unless it is evaded
	 */
	function duel(a,d) {		
		var EVA_FACTOR = 1.125;
		var EVA_INHERENT = 0.5;				
		var l = [];

		a = clone(a); d = clone(d);

		while(d.hp>0) {
			a = [d, d = a][0];
			r = d.eva-a.hit;				
			dg = 0;
			if( !(Math.random() < ( EVA_INHERENT + (r>0?1:-1) * Math.pow(Math.abs(r),EVA_FACTOR)/100)) ) {
				dg = (a.atk-d.def)<1 ? 1 : (a.atk-d.def);
				d.hp = d.hp<dg ? 0 : (d.hp-dg);				
			}
			l.push({atkr:a.id,dmg:dg});
		}

		function clone(c) { return JSON.parse(JSON.stringify(c)); }

		return {winner:a,log:l};
	}

	var p1 = {id:'player 1',hp:10,atk:3,def:1,hit:1,eva:1};
	var p2 = {id:'player 2',hp:10,atk:1,def:3,hit:1,eva:3};
	
	duel(p1,p2)
