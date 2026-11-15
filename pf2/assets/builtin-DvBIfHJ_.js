import{al as U,am as Q,an as X,M as ee,ao as te,ap as ae,aq as ie,ar as ne}from"./index-BTkbCkJB.js";import"./vendor-CHEQ0vhJ.js";function re(i){return i.split(/^#### /m).map(l=>l.trim()).filter(Boolean).map(l=>{const r=l.indexOf(`
`),[n="",u=""]=l.slice(0,r).split("|").map(c=>c.trim());return{slug:n,book:u,text:l.slice(r+1).trim()}})}const K={tiny:"tiny",small:"sm",medium:"med",large:"lg",huge:"huge",gargantuan:"grg"},se=new Set(["uncommon","rare","unique"]),oe={"one-action":{type:"action",n:1},"two-actions":{type:"action",n:2},"three-actions":{type:"action",n:3},reaction:{type:"reaction"},"free-action":{type:"free"}},le=/^(Critical Success|Success|Failure|Critical Failure)$/,ce=/^(Arcane|Divine|Occult|Primal) (Innate|Prepared|Spontaneous) Spells$/,Z=new Set(["AquaticAmbush","Buck","CatchRock","Constrict","Engulf","Ferocity","FrightfulPresence","Grab","GreaterConstrict","ImprovedGrab","ImprovedKnockdown","ImprovedPush","Knockdown","PowerAttack","Pull","Push","ReactiveStrike","Rend","RetributiveStrike","ShieldBlock","SwallowWhole","ThrowRock","Trample"]),he=new Set(["acid","bludgeoning","cold","electricity","fire","force","mental","piercing","poison","slashing","sonic","spirit","vitality","void","bleed","precision","untyped","modular"]),de=new Set(["acrobatics","arcana","athletics","crafting","deception","diplomacy","intimidation","medicine","nature","occultism","performance","religion","society","stealth","survival","thievery"]),p=i=>i.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),J=i=>i.split(/[^A-Za-z0-9]+/).filter(Boolean).map(l=>l[0].toUpperCase()+l.slice(1).toLowerCase()).join(""),H=i=>Number(i.replace(/[–−]/g,"-").replace(/\s+/g,"")),_=i=>i.replace(/\b([a-z])/g,l=>l.toUpperCase());function v(i,l=","){const r=[];let n=0,u="";for(const c of i)c==="("&&n++,c===")"&&(n=Math.max(0,n-1)),c===l&&n===0?(r.push(u.trim()),u=""):u+=c;return u.trim()&&r.push(u.trim()),r}function ge(i){const l=i.trim().toLowerCase(),r=/^(.*?) (\d+) (?:feet|foot|ft\.?)$/.exec(l);if(r)return`${p(r[1])}-${r[2]}`;const n=/^(deadly|fatal|two-hand|jousting|fatal aim) (?:1)?(\d*d\d+)$/.exec(l);return n?`${p(n[1])}-${n[2]}`:/^modular\b/.test(l)?"modular":p(l)}function ue(i){const l=/^(\d+(?:d\d+)?(?:\s*[+–−-]\s*\d+)?)\s*(.*)$/.exec(i.trim());if(!l)return;const r=l[2].replace(/\bdamage\b/,"").trim().toLowerCase().split(/\s+/).filter(Boolean),n=r.find(c=>c==="persistent"||c==="splash"||c==="precision"),u=r.find(c=>he.has(c)&&c!=="precision");if(!r.some(c=>c!==n&&c!==u))return{damage:l[1].replace(/[–−]/g,"-").replace(/\s+/g,""),damageType:u??(n==="precision"?"precision":"untyped"),...n?{category:n}:{}}}const me=i=>`<p>${i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")}</p>`;function fe(i,l=[]){var j,F,q,S,z,T,M,E;const r=i.text.split(`
`).map(d=>d.trim()).filter(Boolean),n=d=>l.push(`${i.slug}: ${d}`),u=r[0]??i.slug,c=Number(((j=/^Creature\s*(-?\d+)/i.exec(r[1]??""))==null?void 0:j[1])??0),I=(r[2]??"").split(/\s+/).filter(Boolean);let m="common",o="med";const k=[];for(const d of I){const f=d.toLowerCase();se.has(f)?m=f:K[f]?o=K[f]:k.push(p(d))}const t={abilities:{},attributes:{immunities:[],weaknesses:[],resistances:[],speed:{value:0,otherSpeeds:[]}},details:{level:{value:c},languages:{value:[]},publication:{license:"ORC",remaster:!0,title:`Pathfinder ${i.book}`}},perception:{mod:0,senses:[]},saves:{},skills:{},traits:{rarity:m,size:{value:o},value:k}},s=[];let P=0;const C=d=>`${d}${String(++P).padStart(4,"0")}`,x=[],L=new Set;let y="interaction",b;for(const d of r.slice(3)){const f=/^\*\*(.+?)\*\*\s*(.*)$/.exec(d),D=((F=f==null?void 0:f[1])==null?void 0:F.trim())??"",R=((q=f==null?void 0:f[2])==null?void 0:q.trim())??d;if(!f){b?b.lines.push(d):n(`строка без подписи: ${d}`);continue}if(le.test(D)&&b){b.lines.push(d);continue}switch(D){case"Perception":{const a=/^([+–−-]\s*\d+)\s*(?:\(([^)]*)\))?\s*;?\s*(.*)$/.exec(R);t.perception.mod=a?H(a[1]):0;const e=a!=null&&a[2]?[`(${a[2]})`]:[];for(const g of a!=null&&a[3]?v(a[3]):[]){const h=/^(.*?)(?:\s*\((precise|imprecise|vague)\))?(?:\s+(\d+)\s*feet)?$/.exec(g.trim()),w=p(h[1]);["darkvision","greater-darkvision","low-light-vision","scent","lifesense","tremorsense","thoughtsense","wavesense","echolocation","see-invisibility","truesight","motion-sense","heatsight"].includes(w)?t.perception.senses.push({type:w,...h[2]?{acuity:h[2]}:{},...h[3]?{range:Number(h[3])}:{}}):e.push(g.trim())}e.length&&(t.perception.details=e.join(", "));break}case"Languages":{const[a="",...e]=R.split(";");t.details.languages.value=v(a).map(p).filter(Boolean),e.join(";").trim()&&(t.details.languages.details=e.join(";").trim());break}case"Skills":for(const a of v(R)){const e=/^(.*?)\s+([+–−-]\s*\d+)(?:\s*\(([+–−-]\s*\d+)\s+([^)]*)\))?$/.exec(a);if(!e){n(`навык: ${a}`);continue}const g=e[1].trim(),h=H(e[2]);/\bLore\b/.test(g)?s.push({_id:C("l"),name:g,type:"lore",system:{mod:{value:h}}}):de.has(g.toLowerCase())?t.skills[g.toLowerCase()]={base:h,...e[3]?{special:[{base:H(e[3]),label:e[4].trim(),predicate:[]}]}:{}}:n(`навык: ${a}`)}break;case"Str":for(const a of d.matchAll(/\*\*(Str|Dex|Con|Int|Wis|Cha)\*\*\s*([+–−-]\s*\d+)/g))t.abilities[a[1].toLowerCase()]={mod:H(a[2])};break;case"Items":for(const a of v(R)){const e=/^(.*?)\s*\((\d+)\)$/.exec(a);s.push({_id:C("i"),name:e?e[1]:a,type:"equipment",system:{quantity:e?Number(e[2]):1}})}break;case"AC":{y="defensive";const a=d.split(";").map(g=>g.trim()),e=/\*\*AC\*\*\s*(\d+)(?:\s*\(([^)]*)\))?/.exec(a[0]??"");t.attributes.ac={value:Number((e==null?void 0:e[1])??0),details:e!=null&&e[2]?`(${e[2]})`:""};for(const g of(a[1]??"").matchAll(/\*\*(Fort|Ref|Will)\*\*\s*([+–−-]\s*\d+)(?:\s*\(([^)]*)\))?/g)){const h={Fort:"fortitude",Ref:"reflex",Will:"will"}[g[1]];t.saves[h]={value:H(g[2]),saveDetail:g[3]?`(${g[3]})`:""}}a.length>2&&(t.attributes.allSaves={value:a.slice(2).join("; ")});break}case"HP":{const a=d.split(/;\s*(?=\*\*)/).map(g=>g.trim()),e=/\*\*HP\*\*\s*(\d+)\s*,?\s*(.*)$/.exec(a[0]??"");t.attributes.hp={max:Number((e==null?void 0:e[1])??0),value:Number((e==null?void 0:e[1])??0),details:((S=e==null?void 0:e[2])==null?void 0:S.trim())??""};for(const g of a.slice(1)){const h=/^\*\*(Immunities|Weaknesses|Resistances)\*\*\s*(.*)$/.exec(g);if(!h){n(`ОЗ: ${g}`);continue}for(const w of v(h[2])){if(h[1]==="Immunities"){t.attributes.immunities.push({type:p(w),exceptions:[]});continue}const W=/^(.*?)\s+(\d+)(?:\s*\(([^)]*)\))?$/.exec(w);if(!W){n(`${h[1]}: ${w}`);continue}const A=W[3]??"",G=((T=(z=/except ([^;]*)/.exec(A))==null?void 0:z[1])==null?void 0:T.replace(/\bor\b/g,",").split(",").map(O=>p(O)).filter(Boolean))??[],$=((E=(M=/double resistance vs\.? ([^;)]*)/.exec(A))==null?void 0:M[1])==null?void 0:E.split(",").map(O=>p(O)).filter(Boolean))??[],B={type:p(W[1]),value:Number(W[2]),exceptions:G,...h[1]==="Resistances"?{doubleVs:$}:{}};(h[1]==="Weaknesses"?t.attributes.weaknesses:t.attributes.resistances).push(B)}}break}case"Speed":{y="offensive";const[a="",...e]=R.split(";");for(const g of v(a)){const h=/^(?:(\w+)\s+)?(\d+)\s*feet$/.exec(g.trim());if(!h){n(`скорость: ${g}`);continue}!h[1]||h[1]==="land"?t.attributes.speed.value=Number(h[2]):t.attributes.speed.otherSpeeds.push({type:h[1],value:Number(h[2])})}e.join(";").trim()&&(t.attributes.speed.details=e.join(";").trim());break}case"Melee":case"Ranged":{const a=/^\[[\w-]+\]\s*(.+?)\s+([+–−-]\s*\d+)\s*(?:\((.*)\))?,\s*\*\*Damage\*\*\s*(.*)$/.exec(R);if(!a){n(`удар: ${d}`);break}const e=a[3]??"",g=e?v(e,e.includes(";")?";":",").map(ge):[],h={},w=[],W=[];a[4].split(/\s+plus\s+/).forEach((A,G)=>{const $=ue(A);if($){h[`d${G}`]=$;return}if(G===0){n(`урон: ${A}`);return}for(const B of A.split(/\s+(?:or|and)\s+/))/^[A-Za-z][A-Za-z’' -]*$/.test(B.trim())?w.push(p(B)):W.push(B.trim())}),w.forEach(A=>L.add(A)),s.push({_id:C("m"),name:_(a[1]),type:"melee",system:{bonus:{value:H(a[2])},traits:{value:g},weaponType:{value:D==="Ranged"?"ranged":"melee"},damageRolls:h,attackEffects:{value:w,custom:W.join(", ")}}});break}default:{const a=ce.exec(D);if(a){ke(d,a[1].toLowerCase(),a[2].toLowerCase(),D,s,C,n);break}const e=/^(?:\[([\w-]+)\])?\s*(?:\(([a-z][a-z ,’'-]*)\))?\s*(.*)$/.exec(R);b={name:D,...e[1]?{action:e[1]}:{},traits:e[2]?v(e[2]).map(p):[],lines:e[3]?[e[3]]:[],category:y},x.push(b)}}}for(const d of L){if(x.some(D=>p(D.name)===d))continue;const f=J(d);Z.has(f)?x.push({name:_(d.replace(/-/g," ")),action:"one-action",traits:[],lines:[],category:"offensive"}):n(`добавка удара без способности: ${d}`)}for(const d of x)s.push(pe(d,C));return{_id:i.slug,name:u,type:"npc",system:t,items:s}}function pe(i,l){const r=i.action?oe[i.action]:void 0,n=J(i.name),u=i.lines.join(`
`),c=Z.has(n)&&u.length<40,m=(u?u.split(`
`).flatMap(o=>o.split(/;\s*(?=\*\*(?:Trigger|Requirements|Effect|Frequency)\*\*)/)):[]).map(me).join("")+(c?`<p>@Localize[PF2E.NPC.Abilities.Glossary.${n}]</p>`:"");return{_id:l("a"),name:i.name,type:"action",system:{actionType:{value:(r==null?void 0:r.type)??"passive"},actions:{value:(r==null?void 0:r.n)??null},category:i.category,traits:{value:i.traits},description:{value:m}}}}function ke(i,l,r,n,u,c,I){var C,x;const m=i.replace(/^\*\*[^*]+\*\*\s*/,"").split(/;\s*(?=\*\*)/),o=Number(((C=/DC\s*(\d+)/.exec(m[0]??""))==null?void 0:C[1])??0),k=Number(((x=/attack\s*\+(\d+)/.exec(m[0]??""))==null?void 0:x[1])??0),t=c("e");let s=null;const P=[];for(const L of m.slice(1)){const y=/^\*\*(Cantrips|Constant)?\s*\(?(\d+)?(?:st|nd|rd|th)?\)?\*\*\s*(.*)$/.exec(L.trim());if(!y){I(`заклинания: ${L}`);continue}const b=y[1]==="Cantrips",j=y[1]==="Constant",F=Number(y[2]??0);b&&(s=F);for(const q of v(y[3])){const S=/^(.*?)\s*\(([^)]*)\)$/.exec(q),z=S?S[1]:q,T=(S==null?void 0:S[2])??"",M=/^x(\d+)$/i.exec(T),E=[j?"Constant":"",/at will/i.test(T)?"At Will":"",!M&&T&&!/at will/i.test(T)?T:""].filter(Boolean);P.push({_id:c("s"),name:_(z)+(E.length?` (${E.join(", ")})`:""),type:"spell",system:{level:{value:b?1:F},traits:{value:b?["cantrip"]:[]},location:{value:t,...b?{}:{heightenedLevel:F},...M?{uses:{max:Number(M[1]),value:Number(M[1])}}:{}}}})}}u.push({_id:t,name:n,type:"spellcastingEntry",system:{prepared:{value:r},tradition:{value:l},spelldc:{dc:o,value:k},autoHeightenLevel:{value:s},slots:{}}}),u.push(...P)}const be=`
#### zombie-shambler | Monster Core
Zombie Shambler
Creature -1
Medium Mindless Undead Unholy Zombie
**Perception** +0; darkvision
**Skills** Athletics +7
**Str** +3, **Dex** –2, **Con** +2, **Int** –5, **Wis** +0, **Cha** –2
**Slow** A zombie is permanently slowed 1 and can’t use reactions.
**AC** 12; **Fort** +6, **Ref** +0, **Will** +2
**HP** 20, void healing; **Immunities** bleed, death effects, disease, mental, paralyzed, poison, unconscious; **Weaknesses** slashing 5, vitality 5
**Speed** 25 feet
**Melee** [one-action] fist +7, **Damage** 1d6+3 bludgeoning plus Grab
**Zombie Bite** [one-action] **Requirements** The zombie has a creature grabbed or restrained; **Effect** The zombie makes a jaws unarmed melee Strike against that creature with an attack modifier of +7 that deals 1d8+3 piercing damage.
#### brownie | Monster Core 2
Brownie
Creature 1
Tiny Fey
**Perception** +7; low-light vision
**Languages** Common, Elven, Fey, Gnomish
**Skills** Acrobatics +7, Crafting +5, Deception +6, Stealth +9
**Str** –2, **Dex** +4, **Con** +1, **Int** +2, **Wis** +4, **Cha** +3
**Items** shortsword
**AC** 16; **Fort** +4, **Ref** +9, **Will** +9
**HP** 21; **Weaknesses** cold iron 3
**Speed** 20 feet
**Melee** [one-action] shortsword +7 (agile, finesse, versatile S), **Damage** 1d6 piercing
**Primal Innate Spells** DC 17; **4th** translocate; **3rd** mending; **1st** ventriloquism; **Cantrips (4th)** light, prestidigitation
**Baffling Bluff** [two-actions] (emotion, mental, primal) The brownie’s antics can confuse and disorient a creature. The brownie targets a single creature within 30 feet; that creature must attempt a DC 17 Will save. The target is temporarily immune to Baffling Bluff for 1 minute.
**Critical Success** The target is unaffected.
**Success** The target is fooled momentarily and is off-guard against the next melee Strike the brownie makes against it before the end of the brownie’s next turn.
**Failure** The target is confused for 1 round.
**Critical Failure** The target is confused for 1 minute. It can attempt a new save at the end of each of its turns to end the confused condition.
#### wolf | Monster Core
Wolf
Creature 1
Medium Animal
**Perception** +7; low-light vision, scent (imprecise) 30 feet
**Skills** Acrobatics +7, Athletics +6, Stealth +7, Survival +7
**Str** +2, **Dex** +4, **Con** +1, **Int** –4, **Wis** +2, **Cha** –2
**AC** 15; **Fort** +6, **Ref** +9, **Will** +5
**HP** 24
**Speed** 35 feet
**Melee** [one-action] jaws +9, **Damage** 1d6+2 piercing plus Knockdown
**Pack Attack** The wolf’s Strikes deal 1d4 extra damage to creatures within reach of at least two of the wolf’s allies.
#### guard | NPC Core
Guard
Creature 1
Medium Human Humanoid
**Perception** +7 (+8 to find concealed objects)
**Languages** Common
**Skills** Athletics +7, Intimidation +5, Legal Lore +3
**Str** +3, **Dex** +2, **Con** +2, **Int** +0, **Wis** +2, **Cha** –1
**Items** crossbow (10 bolts), dagger, sap, scale mail, signal whistle
**AC** 16; **Fort** +7, **Ref** +5, **Will** +5
**HP** 20
**Reactive Strike** [reaction]
**Speed** 25 feet
**Melee** [one-action] sap +7 (agile, nonlethal), **Damage** 1d6+3 bludgeoning
**Melee** [one-action] fist +7 (agile, nonlethal, unarmed), **Damage** 1d4+3 bludgeoning
**Ranged** [one-action] crossbow +6 (range increment 120 feet, reload 1), **Damage** 1d8 piercing
#### cultist | NPC Core
Cultist
Creature 1
Medium Human Humanoid
**Perception** +4
**Languages** Common
**Skills** Cult Lore (for the cultist’s own cult) +8, Deception +3, Intimidation +3, Occultism +4, Society +4, Stealth +6
**Str** +4, **Dex** +3, **Con** +2, **Int** +1, **Wis** –1, **Cha** +0
**Items** cultist garb (functions as leather armor), dagger, occult text
**AC** 17; **Fort** +7, **Ref** +8, **Will** +4 (or +2 vs. higher-ranking members of the cult)
**HP** 20
**Speed** 25 feet
**Melee** [one-action] dagger +7 (agile, versatile S), **Damage** 1d4+4 piercing
**Melee** [one-action] fist +7 (agile, nonlethal, unarmed), **Damage** 1d4+4 bludgeoning
**Ranged** [one-action] dagger +6 (agile, thrown 10 feet, versatile S), **Damage** 1d4+4 piercing
**Fanatical Frenzy** [one-action] **Requirements** The cultist has taken damage and is neither fatigued nor already in a frenzy; **Effect** The cultist flies into a frenzy that lasts 1 minute. While frenzied, the cultist gains a +1 status bonus to attack rolls and a +2 status bonus to damage rolls, and they take a –2 penalty to AC. The cultist can’t voluntarily stop their frenzy. After their frenzy, the cultist is fatigued.
#### boar | Monster Core
Boar
Creature 2
Medium Animal
**Perception** +8; low-light vision, scent (imprecise) 30 feet
**Skills** Acrobatics +5, Athletics +8, Survival +8
**Str** +4, **Dex** +1, **Con** +4, **Int** –4, **Wis** +2, **Cha** –3
**AC** 15; **Fort** +10, **Ref** +5, **Will** +8
**HP** 40
**Ferocity** [reaction]
**Speed** 40 feet
**Melee** [one-action] tusk +10, **Damage** 2d6+4 piercing
**Boar Charge** [two-actions] The boar Strides twice and then makes a tusk Strike. As long as it moved at least 20 feet, it gains a +2 circumstance bonus to its attack roll.
#### crocodile | Monster Core
Crocodile
Creature 2
Large Animal
**Perception** +7; low-light vision
**Skills** Athletics +8, Stealth +7 (+11 in water)
**Str** +4, **Dex** +1, **Con** +3, **Int** –5, **Wis** +1, **Cha** –4
**Deep Breath** The crocodile can hold its breath for about 2 hours.
**AC** 17; **Fort** +9, **Ref** +7, **Will** +5
**HP** 30
**Speed** 20 feet, swim 25 feet
**Melee** [one-action] jaws +10, **Damage** 1d10+4 piercing plus Grab
**Melee** [one-action] tail +10 (agile), **Damage** 1d6+4 bludgeoning
**Aquatic Ambush** [one-action] 35 feet
**Death Roll** [one-action] (attack) **Requirements** The crocodile must have a creature grabbed; **Effect** The crocodile tucks its legs and rolls rapidly, twisting its victim. It makes a jaws Strike with a +2 circumstance bonus to the attack roll against the grabbed creature. If it hits, it also knocks the creature prone. If it fails, it releases the creature.
#### kobold-trapper | NPC Core
Kobold Trapper
Creature 2
Small Humanoid Kobold
**Perception** +7 (+9 to Seek for traps); darkvision
**Languages** Common, Sakvroth
**Skills** Acrobatics +5, Crafting +8, Stealth +7, Survival +7
**Str** +1, **Dex** +3, **Con** +1, **Int** +3, **Wis** +2, **Cha** +0
**Items** backpack, crossbow (20 bolts), formula book (containing formulas for three 1st- or 2nd-level snares), leather armor, light hammer
**Booby-Trapped** A kobold trapper protects items in their backpack with a booby trap. This booby trap requires a successful DC 18 Perception check to notice, and two successful DC 15 Thievery checks to disable. Accessing the backpack without disabling the trap destroys its contents, and splinters explode in a 10-foot burst centered on the backpack, dealing 3d6 piercing damage (DC 15 basic Reflex save).
**AC** 18; **Fort** +5, **Ref** +11, **Will** +8; +1 circumstance to all defenses vs. traps
**HP** 32
**Speed** 25 feet
**Melee** [one-action] light hammer +7 (agile), **Damage** 1d6+1 bludgeoning
**Melee** [one-action] claw +7 (agile, unarmed), **Damage** 1d4+1 slashing
**Ranged** [one-action] crossbow +9 (range increment 120 feet, reload 1), **Damage** 1d8 piercing
**Ranged** [one-action] light hammer +9 (agile, thrown 20 feet), **Damage** 1d6+1 bludgeoning
**Construct Trap** [three-actions] (manipulate) The kobold trapper creates a rudimentary trap on a surface in an adjacent square. The trap activates the next time a creature moves adjacent to it. The creature takes 2d6 bludgeoning, piercing, or slashing damage (determined by the trapper when the trap is constructed) with a DC 18 basic Reflex save. On a failure, the creature also takes a –5 status penalty to all Speeds for 1 minute. The trap is destroyed when activated or after 8 hours, whichever comes first. A trapper typically carries enough raw materials to make six traps each day.
#### bugbear-prowler | Monster Core
Bugbear Prowler
Creature 2
Medium Bugbear Humanoid
**Perception** +7; darkvision, scent (imprecise) 30 feet
**Languages** Common, Goblin
**Skills** Acrobatics +6, Athletics +7, Intimidation +4, Stealth +6
**Str** +4, **Dex** +2, **Con** +3, **Int** –1, **Wis** +1, **Cha** +0
**Items** bastard sword, javelin (3), leather armor
**AC** 17; **Fort** +9, **Ref** +8, **Will** +5
**HP** 34
**Speed** 25 feet
**Melee** [one-action] bastard sword +10 (two-hand d12), **Damage** 1d8+4 piercing
**Melee** [one-action] fist +10 (agile, nonlethal), **Damage** 1d4+4 bludgeoning
**Ranged** [one-action] javelin +8 (thrown 30 feet), **Damage** 1d6+4 piercing
**Bushwhack** [one-action] The bugbear prowler Strides up to 10 feet and attempts to Grapple a creature they’re undetected by. If they succeed, they also deal fist damage to that creature.
**Mauler** The bugbear prowler gains a +3 circumstance bonus to damage rolls against creatures they have grabbed.
#### gang-leader | NPC Core
Gang Leader
Creature 7
Medium Human Humanoid
**Perception** +14
**Languages** Common
**Skills** Acrobatics +15, Athletics +17, Deception +15, Intimidation +17, Society +11, Stealth +17, Thievery +15, Underworld Lore +15
**Str** +4, **Dex** +4, **Con** +2, **Int** +2, **Wis** –1, **Cha** +4
**Items** moderate glue bomb, lesser healing potion, +1 shortsword, sling (10 bullets), studded leather
**AC** 24; **Fort** +13, **Ref** +17, **Will** +12
**HP** 110
**Deny Advantage** The gang leader isn’t off-guard to creatures of 7th level or lower that are hidden, undetected, flanking, or using surprise attack.
**Evasive Reflexes** When the gang leader rolls a success on a Reflex save, they get a critical success instead.
**Nimble Dodge** [reaction] **Trigger** The gang leader is targeted with an attack by an attacker they can see; **Effect** The gang leader gains a +2 circumstance bonus to AC against the triggering attack.
**Speed** 30 feet
**Melee** [one-action] fist +17 (agile, nonlethal, unarmed), **Damage** 1d4+10 bludgeoning
**Melee** [one-action] shortsword +18 (agile, magical, versatile S), **Damage** 1d6+10 piercing
**Ranged** [one-action] sling +17 (propulsive, range increment 50 feet, reload 1), **Damage** 1d6+8 bludgeoning
**Brutal Rally** [reaction] (auditory, emotion, linguistic, mental) **Trigger** The gang leader rolls a critical hit against a creature; **Effect** All allies that can see the gang leader gain a +1 circumstance bonus to attack rolls until the start of the gang leader’s next turn.
**Gang Up** Any enemy is off-guard against the gang leader’s melee attacks due to flanking as long as the enemy is within melee reach of both the gang leader and one of the gang leader’s allies.
**Quick Draw** [one-action] The gang leader Interacts to draw a weapon, then Strikes with that weapon.
**Sneak Attack** The gang leader deals an extra 2d6 precision damage to off-guard creatures.
**Surprise Attacker** On the first round of combat, creatures that haven’t acted are off-guard to the gang leader.
#### bear-grizzly | Monster Core
Grizzly Bear
Creature 3
Large Animal
**Perception** +10; low-light vision, scent (imprecise) 30 feet
**Skills** Athletics +11, Survival +8
**Str** +4, **Dex** +1, **Con** +5, **Int** –4, **Wis** +1, **Cha** –2
**AC** 17; **Fort** +12, **Ref** +6, **Will** +8
**HP** 59
**Speed** 35 feet
**Melee** [one-action] jaws +11, **Damage** 2d8+4 piercing
**Melee** [one-action] claw +11 (agile), **Damage** 1d10+4 slashing plus Grab
**Mauler** The grizzly bear gains a +2 circumstance bonus to damage rolls against creatures it has grabbed.
**Rush** [two-actions] The grizzly bear Strides and makes a Strike at the end of that movement. During the Stride, the grizzly bear gains a +10-foot circumstance bonus to its Speed.
#### wolf-dire | Monster Core
Dire Wolf
Creature 3
Large Animal
**Perception** +10; low-light vision, scent (imprecise) 30 feet
**Skills** Acrobatics +8, Athletics +10, Stealth +8, Survival +10
**Str** +5, **Dex** +3, **Con** +4, **Int** –4, **Wis** +3, **Cha** –2
**AC** 18; **Fort** +11, **Ref** +8, **Will** +8
**HP** 50
**Buck** [reaction] DC 20
**Speed** 35 feet
**Melee** [one-action] jaws +12 (reach 10 feet), **Damage** 1d10+5 piercing plus Grab or Knockdown
**Pack Attack** The dire wolf’s Strikes deal 1d6 extra damage to creatures within reach of at least two of the wolf’s allies.
**Worry** [one-action] (attack) **Requirements** The dire wolf has a creature grabbed or restrained in its jaws; **Effect** The dire wolf fiercely shakes the creature with its teeth, dealing 1d10+2 damage with a DC 20 basic Fortitude save.
#### cockatrice | Monster Core
Cockatrice
Creature 3
Small Beast
**Perception** +8; darkvision
**Skills** Acrobatics +11
**Str** –2, **Dex** +4, **Con** +1, **Int** –3, **Wis** +1, **Cha** –1
**AC** 17; **Fort** +8, **Ref** +11, **Will** +6
**HP** 45; **Immunities** petrified
**Speed** 20 feet, fly 40 feet
**Melee** [one-action] beak +13 (finesse, magical), **Damage** 1d8–2 piercing plus calcification
**Calcification** (incapacitation, primal) A peck from a cockatrice hardens the flesh of the creature struck. The target must succeed at a DC 20 Fortitude save or become slowed 1 (or slowed 2 on a critical failure). Further failed saves against calcification increase the slowed condition. Once a creature’s actions are reduced to 0 by calcification, that creature becomes petrified. If the creature isn’t petrified, the slowed conditions end once 1 minute passes without the creature failing a save against calcification. Every 24 hours after it was petrified, the victim can attempt a DC 20 Fortitude save to recover. On a success, it becomes flesh again, but is slowed 1 for the next 24 hours. On a critical success, the creature recovers and isn’t slowed. On a failure, the creature remains petrified but can try again in 24 hours. On a critical failure, the petrification is permanent, and the creature can’t attempt any more saves.
#### wight | Monster Core
Wight
Creature 3
Medium Undead Unholy Wight
**Perception** +10; darkvision
**Languages** Common, Necril
**Skills** Athletics +10, Intimidation +9, Stealth +8
**Str** +4, **Dex** +1, **Con** +4, **Int** +0, **Wis** +3, **Cha** +2
**Items** dagger
**Grave Weapon** (divine) The wight is bound to a dagger it was buried with. Other wights can be bound to different weapons.
**AC** 18; **Fort** +11, **Ref** +6, **Will** +10
**HP** 40, fueled by spite, void healing; **Immunities** bleed, death effects, disease, paralyzed, poison, unconscious
**Final Spite** [reaction] **Trigger** The wight is reduced to 0 Hit Points; **Effect** The wight makes a Strike before being destroyed. This Strike can inflict corrupting spite, but fueled by spite doesn’t apply.
**Fueled by Spite** Each time a creature loses Hit Points due to a corrupting spite curse the wight inflicted, the wight gains 3 temporary Hit Points.
**Speed** 25 feet
**Melee** [one-action] dagger +12 (agile, versatile S), **Damage** 1d4+6 slashing plus corrupting spite
**Melee** [one-action] claw +12 (agile), **Damage** 1d4+6 slashing plus corrupting spite
**Ranged** [one-action] dagger +10 (agile, thrown 10 feet, versatile S), **Damage** 1d4+6 slashing plus corrupting spite
**Corrupting Spite** (curse, divine, void) The wight’s unarmed attacks and bound weapons inflict a curse that makes a creature grow weak and spiteful. If a wight inflicts corrupting spite on a creature already afflicted by it, the victim attempts a new save, ignoring the result if it’s better than a failure. A living humanoid that dies while under the curse rises as a wight after 1d4 rounds, controlled by the wight that killed it. The wight spawn can’t inflict corrupting spite and is clumsy 2. If its creator dies or after roughly a month of existence, the new wight becomes autonomous and turns into a normal wight; **Saving Throw** DC 17 Fortitude; **Stage 1** drained 1 (1 round); **Stage 2** drained 2 and doesn’t treat any creatures as allies (1 round); **Stage 3** As stage 2, except drained 3 (1 round); **Stage 4** As stage 2, except drained 4 (1 round).
#### great-cat-tiger | Monster Core
Tiger
Creature 4
Large Animal
**Perception** +12; low-light vision, scent (imprecise) 30 feet
**Skills** Acrobatics +11, Athletics +13, Stealth +13
**Str** +5, **Dex** +3, **Con** +3, **Int** –4, **Wis** +2, **Cha** –2
**AC** 21; **Fort** +13, **Ref** +11, **Will** +8
**HP** 60
**Speed** 30 feet
**Melee** [one-action] jaws +13, **Damage** 1d10+7 piercing plus Grab
**Melee** [one-action] claw +13 (agile), **Damage** 1d8+7 slashing
**Pounce** [one-action] The tiger Strides and makes a Strike at the end of that movement. If the tiger began this action hidden, it remains hidden until after this ability’s Strike.
**Sneak Attack** The tiger deals 1d6 extra precision damage to off-guard creatures.
**Wrestle** [one-action] The tiger makes a claw Strike against a creature it is grabbing. If the attack hits, that creature is knocked prone.
#### kelpie | Monster Core 2
Kelpie
Creature 4
Large Amphibious Fey
**Perception** +11; low-light vision
**Languages** Common, Fey, Thalassic
**Skills** Athletics +11, Deception +14, Stealth +10
**Str** +5, **Dex** +2, **Con** +3, **Int** –1, **Wis** +3, **Cha** +4
**AC** 21; **Fort** +11, **Ref** +12, **Will** +14
**HP** 60; **Weaknesses** cold iron 5; **Resistances** fire 5
**Speed** 35 feet, swim 35 feet
**Melee** [one-action] jaws +13, **Damage** 2d6+7 bludgeoning plus Grab
**Captivating Lure** [two-actions] (concentrate, emotion, incapacitation, mental, primal) The kelpie instills an overwhelming attraction to itself within the mind of a single creature within 60 feet. The target perceives the kelpie as a desirable person (if the kelpie is in humanoid form) or a magnificent steed (if the kelpie is in equine form) and must attempt a DC 23 Will saving throw.
**Critical Success** The creature is unaffected and is temporarily immune to Captivating Lure for 24 hours.
**Success** The creature is stupefied 1 for 1 round and is then temporarily immune to Captivating Lure for 24 hours.
**Failure** The creature is fascinated, and it must spend each of its actions to move closer to the kelpie as expediently as possible while avoiding obvious dangers. If a captivated creature is adjacent to the kelpie, it either attempts to mount the kelpie (if the kelpie is in equine form) or stays still and doesn’t act. If the creature is attacked by the kelpie, or if it can’t breathe water and enters an area of water, the creature is freed from captivation at the end of the kelpie’s turn.
**Critical Failure** As failure, but the target doesn’t consider water a danger and will enter an area of water even if it can’t swim or breathe water. If it is attacked by the kelpie or starts to drown, it can attempt a new save at the start of its next turn, but it isn’t freed automatically.
**Change Shape** [one-action] (concentrate, polymorph, primal) The kelpie can take on the appearance of any Medium or Large animal of an equine nature (such as a horse, hippocampus, or pony), or any Small or Medium humanoid. This doesn’t change its Speeds or its attack and damage modifiers with its Strikes.
#### ice-troll | Monster Core 2
Ice Troll
Creature 4
Large Cold Giant Humanoid Troll
**Perception** +10; darkvision
**Languages** Jotun
**Skills** Athletics +10, Intimidation +10, Survival +10
**Str** +5, **Dex** +2, **Con** +5, **Int** –2, **Wis** +2, **Cha** –2
**Easily Misled** The ice troll takes a –4 circumstance penalty to their Perception DC against Deception checks.
**Items** hatchet
**AC** 19; **Fort** +13, **Ref** +10, **Will** +8
**HP** 90, regeneration 15 (deactivated by fire or sonic); **Immunities** cold; **Weaknesses** fire 10, sonic 10
**Furious Carve** [reaction] **Trigger** The ice troll takes fire or sonic damage; **Effect** The troll makes a hatchet or claw Strike against a random creature within reach. If the ice troll has persistent fire damage, they attempt a DC 15 flat check to remove it.
**Speed** 30 feet; ice passage
**Melee** [one-action] jaws +13 (reach 10 feet), **Damage** 2d8+5 piercing
**Melee** [one-action] hatchet +13 (agile, reach 10 feet, sweep), **Damage** 2d6+5 slashing
**Melee** [one-action] claw +13 (agile, reach 10 feet), **Damage** 2d4+5 slashing
**Ranged** [one-action] hatchet +10 (agile, sweep, thrown 10 feet), **Damage** 2d6+5 slashing
**Brutal Sweep** [three-actions] **Requirements** The ice troll is wielding a hatchet; **Effect** The troll sweeps their hatchet in a large arc, dealing 3d6 slashing damage to all creatures in a 5-foot emanation (DC 18 basic Reflex save).
**Ice Passage** An ice troll isn’t impeded by difficult terrain caused by snow or ice, nor do they need to attempt Acrobatics checks to keep from falling on slippery ice.
**Rend** [one-action] claw
#### goblin-scavenger | NPC Core
Goblin Scavenger
Creature 4
Small Goblin Humanoid
**Perception** +14; darkvision
**Languages** Common, Goblin
**Skills** Crafting +12, Society +8, Stealth +11, Survival +10, Thievery +9
**Str** +1, **Dex** +3, **Con** +2, **Int** +2, **Wis** +3, **Cha** +0
**Items** big boom gun (10 rounds), bundle of fireworks (2), dogslicer, leather armor
**Big Boom Gun** The scavenger’s gun is a comically oversized hand cannon that has the fatal d12 trait and a 20-foot range increment. If a Strike with it critically fails, the weapon misfires and explodes, dealing 1d12 fire damage to its wielder. It’s a martial one-handed weapon with 2 Bulk and a Price of 10 gp. It has the uncommon, cobbled, and goblin traits. The cobbled trait means that on a failed attack roll with the gun, the user must succeed at a DC 5 flat check or the weapon misfires.
**AC** 21; **Fort** +9, **Ref** +11, **Will** +13
**HP** 70
**Finders Keepers** [reaction] **Trigger** A creature within 15 feet drops an item; **Requirements** The goblin scavenger has a hand free; **Effect** The goblin scavenger Strides up to their speed to an adjacent square and Interacts to pick up the item. The movement triggers reactions as normal, but the Interact action to pick up the item does not.
**Speed** 25 feet
**Melee** [one-action] dogslicer +12 (agile, backstabber, finesse), **Damage** 2d6+3 slashing
**Melee** [one-action] jaws +12 (unarmed), **Damage** 1d8+3 piercing
**Ranged** [one-action] big boom gun +14 (cobbled; fatal d12; modular B, P, or S; range increment 20 feet; reload 1), **Damage** 2d6+2 modular
**Fireworks Barrage** [two-actions] (manipulate) **Requirements** The goblin scavenger has a free hand; **Effect** The goblin scavenger draws a bundle of fireworks and launches them toward a point within 60 feet, where they explode, dealing 1d10 fire damage and 1d10 sonic damage in a 10-foot burst. Every creature in the area must attempt a DC 21 Reflex save.
**Critical Success** The creature is unaffected. The goblin scavenger realizes that’s because a firework fell at their feet and takes 2 fire damage when it explodes in their face.
**Success** The creature takes half damage.
**Failure** The creature takes full damage and is dazzled and deafened for 1 round.
**Critical Failure** As failure, except the creature is also stunned 1.
**One Person’s Junk** The goblin scavenger intuitively knows how to make use of junk. When they use a weapon with the goblin trait or an improvised weapon, they do an additional die of damage (already included in the Strikes above).
#### orc-gamekeeper | NPC Core
Orc Gamekeeper
Creature 4
Medium Humanoid Orc
**Perception** +13; darkvision
**Languages** Common, Orcish
**Skills** Athletics +13, Diplomacy +9, Nature +13, Stealth +12, Survival +11
**Str** +3, **Dex** +4, **Con** +0, **Int** +0, **Wis** +3, **Cha** +1
**Items** bola (4), hampering snare (2), net, whip
**Insistent Command** When the gamekeeper rolls a success to Command an Animal, they get a critical success instead; if they roll a critical failure, they get a failure instead.
**AC** 20; **Fort** +10, **Ref** +12, **Will** +9
**HP** 65
**Play Chicken** [reaction] **Trigger** An adjacent enemy misses the gamekeeper with a melee attack; **Effect** The gamekeeper tries to catch the overextended attacker and attempts to Grapple them.
**Speed** 25 feet
**Melee** [one-action] whip +14 (disarm, finesse, nonlethal, reach, trip), **Damage** 1d4+9 slashing
**Melee** [one-action] fist +14 (agile, finesse, nonlethal, unarmed), **Damage** 1d4+9 bludgeoning
**Ranged** [one-action] bola +14 (nonlethal, ranged trip, thrown 20 feet), **Damage** 1d6+9 bludgeoning
**Animal Tandem** [two-actions] The orc gamekeeper makes a Strike against a creature adjacent to one of the gamekeeper’s animal allies. If it hits, the animal ally deals one die of damage to the target, using the highest damage die among its unarmed attacks.
#### basilisk | Monster Core
Basilisk
Creature 5
Medium Beast
**Perception** +11; darkvision
**Skills** Athletics +13, Stealth +8
**Str** +4, **Dex** –1, **Con** +5, **Int** –3, **Wis** +2, **Cha** +1
**AC** 22; **Fort** +14, **Ref** +8, **Will** +11
**HP** 75; **Immunities** petrified
**Petrifying Glance** [reaction] (arcane, aura, visual) **Trigger** A creature within 30 feet that the basilisk can see starts its turn; **Effect** The target must attempt a DC 20 Fortitude save. If it fails, it’s slowed 1 for 1 minute as its body slowly stiffens.
**Speed** 20 feet
**Melee** [one-action] jaws +15, **Damage** 2d8+4 piercing
**Petrifying Gaze** [two-actions] (arcane, concentrate, incapacitation, visual) The basilisk stares at a creature it can see within 30 feet. That creature must attempt a DC 22 Fortitude save. If it fails and has not already been slowed by Petrifying Glance or this ability, it becomes slowed 1. If the creature was already slowed by this ability or Petrifying Glance, a failed save causes the creature to be petrified permanently. A creature petrified in this manner that is coated (not just splashed) with fresh basilisk blood no more than 1 hour old is instantly restored to flesh. A single basilisk contains enough blood to coat 1d4 Medium creatures in this manner.
#### yeti | Monster Core
Yeti
Creature 5
Uncommon Large Humanoid
**Perception** +15; darkvision, scent (imprecise) 30 feet
**Languages** Aklo
**Skills** Athletics +14, Stealth +12 (+15 in snow), Survival +11
**Str** +5, **Dex** +2, **Con** +4, **Int** –1, **Wis** +4, **Cha** –1
**Snowblind** When Hiding, the yeti is concealed by any snowfall, even if it’s not thick enough to make other creatures concealed.
**AC** 21; **Fort** +15, **Ref** +11, **Will** +13; +4 status to all saves vs. fear and dreams
**HP** 115; **Immunities** cold; **Weaknesses** fire 10
**Nightmare Guardian** Yetis gain a +4 status bonus to saves against fear and against spells and abilities that affect dreams. A yeti who falls prey to a supernatural nightmare loses this ability and becomes permanently enraged, gaining a +1 status bonus to attack and damage rolls and a –1 status penalty to AC.
**Vanish** [reaction] **Trigger** The yeti is hidden or undetected while not in combat, and a creature would observe it; **Effect** The yeti Strides or Climbs up to half its Speed to a location where it can Hide, then Hides. If its new Stealth check result meets or exceeds the triggering creature’s Perception DC, the yeti remains hidden.
**Speed** 35 feet, climb 20 feet; arctic passage
**Melee** [one-action] claw +15, **Damage** 2d10+5 slashing
**Arctic Passage** The yeti ignores difficult terrain caused by ice or snow.
**Grisly Arrival** [free-action] (emotion, fear, mental) **Trigger** The yeti hits a creature in the first round of combat and the yeti was hidden from that creature at the start of combat; **Effect** Each enemy within 30 feet that witnesses the attack (including the target of the attack) must attempt a DC 23 Will save. On a failure, the creature is frightened 2; on a critical failure, it’s frightened 4.
**Rend** [one-action] claw
#### necromancer | NPC Core
Necromancer
Creature 5
Medium Human Humanoid
**Perception** +10
**Languages** Common, Necril
**Skills** Arcana +11, Intimidation +8, Occultism +13
**Str** +2, **Dex** +3, **Con** +2, **Int** +4, **Wis** +2, **Cha** –1
**Items** hooded robe, light mace
**Stench of Decay** (aura, occult, olfactory) The necromancer emits a scent of putrid rot in a 5-foot emanation. A living creature that enters or begins its turn in the aura is sickened 1.
**AC** 20; **Fort** +11, **Ref** +12, **Will** +11
**HP** 65
**Speed** 25 feet
**Melee** [one-action] light mace +14 (agile, finesse, shove), **Damage** 1d4+8 bludgeoning
**Melee** [one-action] fist +14 (agile, finesse, nonlethal, unarmed), **Damage** 1d4+8 bludgeoning
**Occult Innate Spells** DC 23; **Cantrips (3rd)** void warp
**Undead, Arise!** [one-action] (concentrate, manipulate, occult) The necromancer summons two Medium undead entities in different empty squares up to 30 feet away. These undead entities can take the form of zombies, skeletons, or ghosts, chosen by the necromancer. The entities block movement as though they were creatures and can be attacked. Each entity has 1 Hit Point and the same AC and saves as the necromancer. They can’t take actions of their own and deteriorate if the necromancer is reduced to 0 Hit Points. The necromancer can have up to four undead entities at any given time. If they call another, the oldest undead entity deteriorates.
**Undead, Attack!** [two-actions] (concentrate, occult) **Requirements** The necromancer has at least one undead entity active; **Effect** The necromancer commands all their undead entities to attack. Each entity can Stride up to 20 feet into an empty square and make a Strike. The Strike has a +15 attack modifier and deals 2d12 bludgeoning damage (or spirit damage if the entity is a spirit). The Strike has the magical trait, and no multiple attack penalty applies to it.
**Wave of Death** [two-actions] (concentrate, manipulate, occult, void) **Requirements** The necromancer isn’t drained and has at least one undead entity active; **Effect** The necromancer overloads their undead entities with void energy, causing all of them to explode. Each entity is destroyed, dealing 4d12 void damage to each creature in a 10-foot emanation with a DC 23 basic Fortitude save. A creature in more than one explosion is damaged only once. The necromancer becomes drained 1.
#### watchmage | NPC Core
Watchmage
Creature 5
Medium Human Humanoid
**Perception** +15
**Languages** Common
**Skills** Arcana +13, Athletics +10, Intimidation +9, Legal Lore +13, Society +11
**Str** +1, **Dex** +4, **Con** +2, **Int** +4, **Wis** +1, **Cha** +0
**Items** leather armor, shortbow (20 arrows), spellbook (contains all prepared spells plus earthbind, revealing light, sleep, tailwind)
**Arcane Watch** The watchmage can either Investigate or Search while using the Detect Magic exploration activity.
**AC** 21; **Fort** +9, **Ref** +12, **Will** +14
**HP** 70
**Counter Escape** [reaction] (arcane) **Trigger** A creature Casts a Spell with the teleportation trait or as a reaction; **Effect** The watchmage expends a spell slot of the same rank or higher as the trigger creature’s spell and attempts to counteract the triggering spell (counteract modifier +11).
**Speed** 25 feet
**Melee** [one-action] fist +15 (agile, finesse, nonlethal, unarmed), **Damage** 1d6+5 bludgeoning
**Ranged** [one-action] shortbow +15 (deadly d10, magical, range increment 60 feet), **Damage** 1d6+4 piercing plus 1d6 force
**Arcane Prepared Spells** DC 20, attack +12; **3rd** haste, slow; **2nd** dispel magic, see the unseen; **1st** command, force barrage, sure strike; **Cantrips (3rd)** detect magic, frostbite, ignition, read aura, tangle vine
**Eldritch Arms** (concentrate) In a brief ritual that takes 10 minutes, the watchmage chooses a single weapon or unarmed attack through which they can focus their magic. Strikes the watchmage makes with that weapon are magical and deal 1d6 additional force damage.
**Spellbound Strike** [three-actions] **Requirements** The watchmage is wielding the weapon chosen with Eldritch Arms; **Effect** The watchmage Casts a Spell that takes 1 or 2 actions to cast, imbuing that spell into the weapon. The watchmage Strikes with the required weapon. This counts as two attacks for the watchmage’s multiple attack penalty. On a hit, the target is also affected by the spell, though the target gets any normal defenses allowed by the spell. If the spell is targeted, it targets the creature that was hit and no one else. If the spell is an area, the target must be in the area. A burst is centered on a corner of the target’s square if the target is Medium or smaller, or the corner of a square closest to the creature’s center if it’s Large or larger. A cone or line emits from a square of the watchmage’s choice adjacent to the target.
#### will-o-wisp | Monster Core
Will-o’-Wisp
Creature 6
Small Aberration Air
**Perception** +16; darkvision
**Languages** Aklo, Common
**Skills** Acrobatics +18, Deception +12, Intimidation +12, Stealth +16
**Str** –5, **Dex** +6, **Con** +0, **Int** +2, **Wis** +4, **Cha** +2
**AC** 27; **Fort** +10, **Ref** +16, **Will** +14
**HP** 50; **Immunities** magic
**Glow** (aura, light) 20 feet. A will-o’-wisp is itself naturally invisible, but glows with a colored light, casting bright light in the aura and making it visible.
**Magic Immunity** A will-o’-wisp is immune to all spells except force barrage, quandary, and revealing light.
**Speed** fly 50 feet
**Melee** [one-action] shock +17 (electricity, magical), **Damage** 2d8+4 electricity
**Feed on Fear** [one-action] (concentrate) **Frequency** once per round; **Requirements** An enemy within 15 feet is under a fear effect or dying; **Effect** The will-o’-wisp feeds on the creature’s terror. It regains 2d4 Hit Points, and if it has Gone Dark, its glow reignites.
**Go Dark** [one-action] (concentrate) The will-o’-wisp extinguishes its glow, becoming invisible. It can end this effect with another use of this action. If it uses its shock attack while invisible, the arc of electricity lets any observer determine its location, making the will-o’-wisp only hidden to all observers until it moves.
#### wraith | Monster Core
Wraith
Creature 6
Medium Incorporeal Undead Unholy Wraith
**Perception** +14; darkvision, lifesense 60 feet
**Languages** Common, Necril
**Skills** Acrobatics +12, Diplomacy +13, Intimidation +15, Stealth +16
**Str** –5, **Dex** +4, **Con** +0, **Int** +2, **Wis** +2, **Cha** +5
**AC** 24; **Fort** +8, **Ref** +14, **Will** +14
**HP** 80, void healing; **Immunities** bleed, death effects, disease, paralyzed, poison, precision, unconscious; **Resistances** all damage 5 (except force, ghost touch, spirit, or vitality; double resistance vs. non-magical)
**Sunlight Powerlessness** While in sunlight, a wraith is blinded and slowed 2.
**Speed** fly 40 feet
**Melee** [one-action] wraith touch +17 (agile, divine, finesse, void), **Damage** 3d8 void
**Grip of Fear** [two-actions] (emotion, fear, mental, nonlethal) The wraith reaches into an adjacent creature’s chest, gripping their heart. The target takes 6d6 mental damage with a DC 24 basic Will save. On a critical failure, the creature is also paralyzed until the start of the wraith’s next turn.
**Robes of Welcome** [one-action] (divine, void) **Frequency** once per round; **Effect** The wraith wraps its robes around an adjacent living creature, exposing it to void’s embrace. If any creature is cursed by the wraith’s void’s embrace, the wraith can’t impose void’s embrace on another creature.
**Void’s Embrace** (curse, death, divine, void) If the victim succeeds at a saving throw against this curse while in sunlight, the curse ends. While you have this curse, you bypass the resistance of the wraith that cursed you; **Saving Throw** DC 24 Will; **Stage 1** the victim is dazzled in any light (1 hour); **Stage 2** the victim gains lifesense 30 feet but is blinded in any light (1 hour); **Stage 3** as stage 2, but the creature also has void healing (1 hour); **Stage 4** the victim becomes unconscious and can’t awaken (1 day); **Stage 5** the creature dies and becomes a wraith, its body crumbling to ash
#### cave-giant | Monster Core 2
Cave Giant
Creature 6
Large Giant Humanoid
**Perception** +15; darkvision
**Languages** Common, Jotun
**Skills** Athletics +18, Intimidation +14
**Str** +6, **Dex** +3, **Con** +5, **Int** –2, **Wis** +3, **Cha** +2
**Items** +1 greataxe, hide armor
**AC** 23; **Fort** +17, **Ref** +13, **Will** +11
**HP** 110
**Speed** 35 feet
**Melee** [one-action] greataxe +18 (magical, reach 10 feet, sweep), **Damage** 1d12+9 slashing
**Melee** [one-action] fist +18 (agile, reach 10 feet, unarmed), **Damage** 1d8+9 bludgeoning
**Ranged** [one-action] rock +16 (brutal, range increment 120 feet), **Damage** 2d6+10 bludgeoning
**Forceful Fracture** [two-actions] **Requirements** The cave giant is within reach of any kind of stone; **Effect** The cave giant pounds their fist into the nearby stone, fracturing it into chunks to hurl at other creatures. The giant then makes two ranged rock Strikes, each targeting a separate creature. Both attacks count toward their multiple attack penalty, but the penalty doesn’t increase until after they’ve made both attacks.
**Smear** [two-actions] (attack) **Requirements** The cave giant is within reach of a creature that is adjacent to a wall or other solid vertical surface; **Effect** The cave giant snags the creature and smashes it against the wall. The giant attempts an Athletics check against the target’s Reflex DC. On a success, the cave giant Grabs the creature and smears it along the nearby wall, dealing 2d8+8 bludgeoning damage. On a critical success, the damage is doubled.
#### big-boss-goblin | NPC Core
Big Boss Goblin
Creature 6
Small Goblin Humanoid
**Perception** +16; darkvision
**Languages** Common, Goblin
**Skills** Athletics +15, Diplomacy +13, Intimidation +15, Stealth +11
**Str** +3, **Dex** +1, **Con** +3, **Int** +1, **Wis** +1, **Cha** +3
**Items** battered crown (or other symbol of authority), hide armor, +1 horsechopper, shortbow (20 arrows)
**AC** 22; **Fort** +17, **Ref** +11, **Will** +14
**HP** 100
**Reactive Strike** [reaction]
**Not Me!** [reaction] (manipulate) **Trigger** The big boss goblin is targeted with an attack, and a goblin is adjacent to them; **Effect** The big boss goblin yanks the goblin in front of the attack to face the consequences in their stead. The big boss goblin gains a +2 circumstance bonus to their AC against the triggering attack. If it hits, the big boss goblin takes half damage, and the other goblin takes the remaining half.
**Speed** 25 feet
**Melee** [one-action] horsechopper +17 (magical, reach 10 feet, trip, versatile P), **Damage** 1d8+5 slashing
**Melee** [one-action] jaws +15 (finesse, unarmed), **Damage** 1d6+5 piercing
**Ranged** [one-action] shortbow +14 (deadly d10, range increment 60 feet, reload 0), **Damage** 1d6+2 piercing
**No Fight Fair** A big boss goblin fights dirty, slashing at a foe’s hamstrings. Whenever the big boss goblin hits an off-guard foe, the creature takes a –5-foot status penalty to its speed (–10-foot on a critical hit) until the creature regains any amount of Hit Points. As with all penalties to Speed, this can’t reduce a creature’s Speed below 5 feet.
**Stab it! Stab it! Stab it!** [one-action] The big boss goblin picks a target they can see within 30 feet and orders any allied goblins to attack. A single goblin with a lower level than the big boss goblin that is adjacent to the target can immediately use their reaction to Strike the target. In addition, until the start of the big boss goblin’s next turn, their attacks against that target deal 1 additional damage dice as the big boss goblin leads them.
#### graveknight-captain | Monster Core 2
Graveknight Captain
Creature 6
Uncommon Medium Undead Unholy
**Perception** +14; darkvision
**Languages** Common, Necril
**Skills** Athletics +16, Intimidation +15, Survival +12, Warfare Lore +13
**Str** +5, **Dex** +3, **Con** +4, **Int** +1, **Wis** +2, **Cha** +3
**Items** +1 full plate, graveknight’s shield (Hardness 8, HP 64, BT 32), warhammer
**AC** 24 (26 with shield raised); **Fort** +16, **Ref** +14, **Will** +13
**HP** 90, rejuvenation, void healing; **Immunities** acid, bleed, death, disease, paralyzed, poison, unconscious
**Graveknight’s Shield** (arcane) The graveknight’s curse extends to their shield, or the graveknight’s armor uses a portion of itself to produce a shield. The graveknight has a shield that uses the statistics of a sturdy shield of a level no higher than the graveknight’s level – 1. The shield is quasi-independent of the graveknight and automatically protects the graveknight from harm. When the shield is raised, it automatically uses Shield Block to reduce the damage of the first attack against the graveknight each round without the graveknight needing to spend their reaction to do so. The shield automatically rejuvenates with the rest of the graveknight and must be destroyed in the same manner as the graveknight’s armor.
**Reactive Strike** [reaction]
**Speed** 25 feet
**Melee** [one-action] warhammer +16 (acid, magical, shove), **Damage** 2d8+7 bludgeoning plus 1d6 acid
**Melee** [one-action] fist +16 (acid, agile, magical), **Damage** 2d4+7 bludgeoning plus 1d6 acid
**Devastating Blast** [two-actions] (acid, arcane) The graveknight unleashes a 30-foot cone of energy. Creatures in the area take 4d12 acid area damage with a basic DC 24 Reflex save. The graveknight can use this ability once every 1d4 rounds.
**Graveknight’s Curse** (arcane, curse) Wearing graveknight armor is very risky, for the graveknight’s essence inevitably kills the host, transforming their flesh into the graveknight’s new body. Removing the curse allows a character to remove the armor, but if they ever wear the armor again, the curse returns. If the wearer dies from another cause while wearing the armor, or if the graveknight’s rejuvenation completes before the wearer dies from the curse, the wearer immediately progresses to stage 3.
This curse affects anyone who wears a graveknight’s armor for at least 1 hour; **Saving Throw** DC 24 Will save; **Onset** 1 hour; **Stage 1** doomed 1 and can’t remove armor (1 day); **Stage 2** doomed 2, –10-foot status penalty to Speeds, and can’t remove armor (1 day); **Stage 3** dies and transforms into the armor’s graveknight.
**Ruinous Weapons** Any weapon or unarmed attack the graveknight uses gains the effects of a +1 striking weapon and a caustic weapon rune.
#### young-whisper-dragon | Monster Core 2
Young Whisper Dragon
Creature 7
Large Dragon Occult
**Perception** +15 (+17 to Sense Motive); darkvision, scent (imprecise) 60 feet
**Languages** Common, Draconic, Empyrean, Fey; telepathy 100 feet
**Skills** Acrobatics +12, Athletics +14, Deception +13, Diplomacy +15, Intimidation +13, Occultism +15, Society +17, Stealth +14, Underworld Lore +17
**Str** +4, **Dex** +2, **Con** +3, **Int** +3, **Wis** +2, **Cha** +3
**Information Network** The dragon can attempt a Society check to Recall Knowledge in place of a check to Gather Information, recalling intelligence from prior informants.
**AC** 25; **Fort** +15, **Ref** +13, **Will** +18; +2 status to all saves vs. occult
**HP** 110; **Immunities** confused, paralyzed, sleep
**Diplomatic Solution** [free-action] (emotion, incapacitation, mental, occult) **Trigger** The dragon rolls initiative; **Effect** The dragon targets all enemies it can see within 60 feet with calm heightened to a rank equal to half the dragon’s level rounded up (DC 23 Will save). The dragon doesn’t need to Sustain this effect, but if the dragon takes any hostile action against those affected, it breaks the effect for all creatures.
**Distracting Whisper** [reaction] (mental, occult) **Trigger** The dragon is targeted with an attack; **Effect** A mysterious voice whispers something disconcerting in the triggering creature’s ear, inflicting a –2 circumstance penalty to the triggering attack.
**Speed** 40 feet, fly 140 feet
**Melee** [one-action] jaws +18 (magical, reach 10 feet), **Damage** 2d10+6 piercing
**Melee** [one-action] claw +18 (agile, magical), **Damage** 2d8+6 slashing
**Melee** [one-action] tail +16 (magical, reach 15 feet), **Damage** 2d8+6 bludgeoning
**Occult Innate Spells** DC 25; **4th** charm, clairvoyance (at will), suggestion; **3rd** clairaudience (at will); **2nd** embed message; **Cantrips (4th)** daze, message
**Cogitation Breath** [two-actions] (mental, occult) The dragon unleashes a befuddling miasma, dealing 6d6 mental damage in a 30-foot cone (DC 25 basic Will save). A creature that fails its save is stupefied 1 (stupefied 2 on a critical failure) for 1 minute. The dragon can’t use Cogitation Breath again for 1d4 rounds.
**Draconic Frenzy** [two-actions] The dragon makes two claw Strikes and one tail Strike in any order.
**Draconic Momentum** The dragon recharges their Cogitation Breath whenever they score a critical hit with a Strike.
**Steal Knowledge** [one-action] (concentrate, mental, occult) The dragon plucks a fragment of knowledge from the mind of a creature within 60 feet, choosing a skill to affect. The creature must attempt a DC 23 Will save.
**Success** The creature is unaffected.
**Failure** For the next minute, the creature takes a –1 status penalty to checks using that skill, and the dragon gets a +1 status bonus to using that skill.
**Critical Failure** As failure, but the penalty is –2 and the bonus is +2.
#### chimera | Monster Core
Chimera
Creature 8
Uncommon Large Beast
**Perception** +16; darkvision, scent (imprecise) 30 feet
**Languages** Draconic
**Skills** Acrobatics +14, Athletics +18, Stealth +18
**Str** +6, **Dex** +2, **Con** +4, **Int** –3, **Wis** +2, **Cha** +0
**AC** 27; **Fort** +18, **Ref** +16, **Will** +14
**HP** 135
**Multiple Reactions** A chimera gains 2 extra reactions each round that it can use only to make Reactive Strikes. It must use a different head for each reaction, and it can’t use more than one on the same triggering action. If it loses one of its heads, it also loses one of these extra reactions.
**Three Headed** Any ability that would sever a chimera’s head (such as a critical hit with a vorpal weapon) severs one head at random. Losing a head doesn’t kill a chimera (as long as it has one head left), but it does prevent it from making Strikes with the lost head or using the head’s Dragon Breath.
**Reactive Strike** [reaction]
**Speed** 25 feet, fly 40 feet
**Melee** [one-action] dragon jaws +20, **Damage** 2d6+9 piercing plus 2d6 energy damage (see draconic bite)
**Melee** [one-action] lion jaws +20, **Damage** 2d10+9 piercing
**Melee** [one-action] goat horns +20, **Damage** 2d10+9 piercing
**Melee** [one-action] claw +20 (agile), **Damage** 2d6+9 slashing
**Draconic Bite** A chimera’s dragon head deals an extra 2d6 damage of a type matching the damage dealt by its Dragon Breath.
**Dragon Breath** [two-actions] The chimera breathes a cone or line that deals 9d6 damage to all creatures in the area (DC 26 basic save of a type indicated below). The chimera’s dragon head is linked to one of the traditions of magic, which determines the area of its Dragon Breath, the type of damage it deals, and the type of save to avoid it. This ability gains the related traits. The chimera can’t use Dragon Breath again for 1d4 rounds.
Arcane 60-foot line of force (Reflex)
Divine 60-foot line of spirit (Reflex); this ability can also have the holy or unholy trait
Occult 30-foot cone of mental (Will)
Primal 30-foot cone of acid, cold, electricity, fire, or sonic (Reflex); or poison (Fortitude)
**Three-Headed Strike** [two-actions] The chimera makes a Strike with its dragon jaws, lion jaws, and goat horns, each at a –2 penalty and targeting a different creature. These Strikes count as only one attack for the chimera’s multiple attack penalty, and the penalty doesn’t increase until after it has made all three attacks.
#### two-headed-troll | Monster Core 2
Two-Headed Troll
Creature 8
Uncommon Large Giant Humanoid Troll Wood
**Perception** +16; darkvision
**Languages** Jotun
**Skills** Athletics +18, Intimidation +17
**Str** +6, **Dex** +1, **Con** +6, **Int** –2, **Wis** +4, **Cha** +3
**Easily Misled** The two-headed troll takes a –4 circumstance penalty to their Perception DC against Deception checks.
**Independent Brains** Each of a two-headed troll’s heads rolls their own initiative and has their own turn. Neither head can Delay. At the start of a head’s turn, that head gets 2 actions and 1 reaction. Each brain controls one arm, but both can move the legs. Any ability or item that would sever a two-headed troll’s head (such as a vorpal weapon) doesn’t cause the two-headed troll to die if they still have their other head, but does cause them to lose the turns, actions, and reactions of the severed head. Mental effects that target a single creature affect only one of the troll’s heads.
**Items** club
**AC** 24; **Fort** +19, **Ref** +15, **Will** +14
**HP** 190, regeneration 20 (deactivated by electricity or fire); **Weaknesses** electricity 10, fire 10
**Head Regrowth** A two-headed troll’s regeneration can regrow a severed head. After regaining Hit Points from regeneration, the two-headed troll attempts a DC 10 flat check. On a success, a missing head is fully restored. If a two-headed troll loses their last remaining head, they die immediately.
**Reactive Strike** [reaction]
**Speed** 30 feet
**Melee** [one-action] jaws +18 (reach 10 feet), **Damage** 2d12+8 piercing
**Melee** [one-action] claw +18 (agile, reach 10 feet), **Damage** 2d8+8 slashing
**Melee** [one-action] club +18 (reach 10 feet), **Damage** 2d6+8 bludgeoning
**Ranged** [one-action] club +13 (thrown 10 feet), **Damage** 2d6+8 bludgeoning
**Collaborative Chomp** [two-actions] The troll makes a claw Strike and Grabs a single target. If both are successful, the other head can use their reaction to make a jaws Strike against that creature.
#### nosferatu-malefactor | Monster Core 2
Nosferatu Malefactor
Creature 10
Uncommon Medium Undead Unholy Vampire
**Perception** +19; darkvision
**Languages** Aklo, Common, Necril; telepathy 60 feet
**Skills** Acrobatics +21, Arcana +21, Athletics +19, Deception +17, Intimidation +19, Stealth +23
**Str** +5, **Dex** +7, **Con** +3, **Int** +7, **Wis** +5, **Cha** +3
**AC** 30; **Fort** +17, **Ref** +21, **Will** +19
**HP** 135, fast healing 10, plagued coffin restoration, void healing; **Immunities** death effects, disease, paralyzed, poison, sleep; **Resistances** physical 10 (except magical wood)
**Nosferatu Vulnerabilities** A nosferatu has the following vulnerabilities.
**Revulsion** A nosferatu can’t voluntarily come within 10 feet of brandished garlic or a brandished religious symbol of a deity with a holy sanctification option. To brandish garlic or a religious symbol, a creature must Interact to do so for 1 round (similar to Raising a Shield). If the nosferatu involuntarily comes within 10 feet of an object of their revulsion, they gain the fleeing condition, running from the object of their revulsion until they end an action beyond 10 feet. After 1 round of being exposed to the subject of their revulsion, a nosferatu can attempt a DC 25 Will save as a single action, which has the concentrate trait. On a success, they overcome their revulsions for 1d6 rounds (or 1 hour on a critical success).
**Stake** A magical wooden stake (such as one affected by a weapon potency rune, runic weapon, or similar magic) driven through the nosferatu’s heart drops the nosferatu to 0 HP and prevents them from healing above 0 HP, even in their coffin. Staking a nosferatu requires 3 actions and works only if the nosferatu is unconscious. If the stake is removed, the nosferatu can heal above 0 HP again, and if they’re in their coffin, the 1-hour rest period begins once the stake is removed. If the nosferatu’s head is severed and anointed with holy water while the stake is in place, the nosferatu is destroyed.
**Sunlight** If exposed to direct sunlight, a nosferatu immediately becomes slowed 1. The slowed value increases by 1 each time the nosferatu ends their turn in sunlight, and the condition ends when they’re no longer in sunlight. If the nosferatu loses all their actions in this way, they’re destroyed.
**Speed** 30 feet, climb 25 feet
**Melee** [one-action] claw +23 (agile, finesse), **Damage** 2d10+11 piercing plus plague of ancients
**Melee** [one-action] fangs +23 (finesse), **Damage** 2d12+11 piercing plus Drink Blood
**Divine Innate Spells** DC 29; **5th** telekinetic haul (x3)
**Change Shape** [one-action] (concentrate, divine, polymorph) The nosferatu transforms into a swarm of pale-gray rats. They gain a land Speed of 30 feet and a climb Speed of 10 feet, and they become Large. In this swarm form, the nosferatu can take an action to deal each enemy in the swarm’s space 2d10 piercing damage with a basic DC 29 Reflex save. A creature that fails its save is also exposed to plague of ancients.
**Command Thrall** [free-action] (auditory, divine, mental) **Requirements** One of the nosferatu’s thralls is present and can hear the nosferatu; **Effect** The nosferatu gives a single command to one of their thralls, which the thrall follows to the best of its ability during its next turn.
**Dominate** [two-actions] (divine, incapacitation, mental, visual) The nosferatu can cast dominate at will as a divine innate spell. Casting it requires staring into the target’s eyes, giving the spell the visual trait. The save DC is 29, and a creature that succeeds is temporarily immune to that nosferatu’s Dominate for 24 hours. Fully destroying the nosferatu ends the domination, but merely reducing the nosferatu to 0 HP is insufficient to break the spell.
**Drink Blood** [one-action] (divine) **Requirements** The nosferatu’s last action was a successful fangs Strike; **Effect** The nosferatu sinks their fangs into the targeted creature to drink its blood. This requires an Athletics check against the creature’s Fortitude DC. On a success, the creature becomes drained 1, and the nosferatu regains 13 HP, gaining any excess HP as temporary Hit Points. Drinking Blood from a creature that’s already drained doesn’t restore any HP to the nosferatu but increases the creature’s drained condition value by 1, killing the victim when it reaches drained 5. A nosferatu can also consume blood that’s been emptied into a vessel for sustenance, but they gain no HP from doing so. The target creature’s drained condition value decreases by 1 per week. A blood transfusion, which requires a successful DC 20 Medicine check and sufficient blood or a blood donor, reduces the drained value by 1 after 10 minutes.
**Plague of Ancients** (disease, virulent) **Saving Throw** DC 29 Fortitude; **Onset** 1 day; **Stage 1** drained 1 (1 day); **Stage 2** drained 2 and enfeebled 2 (1 day); **Stage 3** doomed 1, drained 3, and enfeebled 3 (1 day); **Stage 4** doomed 2, drained 3, and enfeebled 3 (1 day); **Stage 5** unconscious (1 day); **Stage 6** death
#### orc-veteran-master | NPC Core
Orc Veteran Master
Creature 10
Medium Humanoid Orc
**Perception** +20; darkvision
**Languages** Common, Orcish
**Skills** Acrobatics +20, Athletics +23, Diplomacy +15, Intimidation +20, Warfare Lore +18, Stealth +20
**Str** +5, **Dex** +4, **Con** +3, **Int** +0, **Wis** +2, **Cha** +1
**Items** +1 striking bo staff, +1 breastplate, +1 striking composite longbow (20 arrows)
**AC** 30; **Fort** +19, **Ref** +20, **Will** +18
**HP** 175
**Fly Through Battle** The veteran master gains an additional reaction each round that can be used only to make a Reactive Pursuit.
**Reactive Pursuit** [reaction] **Trigger** An enemy within reach attempts to move away; **Effect** The veteran master Strides up to their Speed, following the enemy and keeping it in reach throughout its movement until it stops moving or the master has moved their full Speed.
**Reactive Strike** [reaction]
**Speed** 30 feet
**Melee** [one-action] bo staff +24 (magical, parry, reach, trip), **Damage** 2d8+13 bludgeoning
**Melee** [one-action] fist +24 (agile, nonlethal, unarmed), **Damage** 2d4+13 bludgeoning
**Ranged** [one-action] composite longbow +23 (deadly d10, magical, propulsive, range increment 100 feet, reload 0, volley 30 feet), **Damage** 2d8+10 piercing
**Staff Swipe** [two-actions] The veteran master extends their reach to smash multiple creatures with their bo. They attempt a bo staff Strike against each enemy in a 15-foot cone. This counts as two attacks toward their multiple attack penalty, but the penalty doesn’t increase until after all the attacks.
**Reshape the Battle** [one-action] The veteran master attempts a bo staff Strike. If it hits a creature of the master’s size or smaller, the master can automatically Reposition it to any space within the bo staff’s reach.
#### skeletal-titan | Monster Core 2
Skeletal Titan
Creature 13
Gargantuan Mindless Skeleton Undead Unholy
**Perception** +19; darkvision
**Skills** Athletics +28
**Str** +9, **Dex** +3, **Con** +4, **Int** –5, **Wis** +2, **Cha** –1
**AC** 33; **Fort** +23, **Ref** +24, **Will** +21
**HP** 210, void healing; **Immunities** bleed, death effects, disease, mental, paralyzed, poison, unconscious; **Resistances** cold 10, electricity 10, fire 10, piercing 15, slashing 15
**Speed** 40 feet, fly 20 feet
**Melee** [one-action] mountain sword +26 (reach 20 feet), **Damage** 3d12+13 bludgeoning
**Melee** [one-action] claw +26 (agile, reach 15 feet), **Damage** 3d8+13 slashing
**Melee** [one-action] foot +26 (reach 15 feet), **Damage** 3d8+13 bludgeoning
**Ranged** [one-action] bone +24 (brutal, range increment 60 feet), **Damage** 2d10+13 bludgeoning plus bone debris
**Divine Innate Spells** DC 31; **Constant (7th)** fly
**Bone Debris** The bones a skeletal titan throws are large enough to clutter the battlefield. When the skeletal titan hits a creature with a bone attack, the projectile becomes difficult terrain in the square the creature occupies (or, if the creature occupies more than one square, one square it occupies of the titan’s choice). If the titan misses with a bone attack, instead a random square adjacent to the creature becomes difficult terrain.
**Mountain Slam** [three-actions] The skeletal titan slams its mountain sword into the ground. The shock wave reverberates, dealing 3d12+13 bludgeoning damage to all creatures in a 20-foot line (DC 33 basic Reflex save). A creature that fails its save is also knocked prone.
**Trample** [three-actions] Huge or smaller, foot, DC 33
#### ancient-cinder-dragon | Monster Core 2
Ancient Cinder Dragon
Creature 19
Uncommon Gargantuan Dragon Fire Primal
**Perception** +35; darkvision, scent (imprecise) 60 feet, smoke vision
**Languages** Common, Draconic, Pyric
**Skills** Acrobatics +30, Athletics +38, Diplomacy +35, Intimidation +37, Nature +36, Stealth +37
**Str** +10, **Dex** +4, **Con** +8, **Int** +5, **Wis** +6, **Cha** +7
**Smoke Vision** Smoke doesn’t impair a cinder dragon’s vision; they ignore the concealed condition from smoke.
**AC** 42; **Fort** +34, **Ref** +30, **Will** +32; +2 status to all saves vs. primal
**HP** 425; **Immunities** fire, paralyzed, sleep; **Weaknesses** cold 20
**Dragon Heat** (aura, fire, primal) 5 feet, 4d6 fire damage (DC 37 basic Reflex)
**Frightful Presence** (aura, emotion, fear, mental) 90 feet, DC 39
**Boiling Blood** [reaction] (fire) **Trigger** The dragon is critically hit with a melee attack; **Effect** The dragon’s superheated blood spills onto the attacker. The target takes 10d6 fire damage (DC 41 basic Reflex save).
**Reactive Strike** [reaction] Jaws only.
**Speed** 60 feet, fly 180 feet
**Melee** [one-action] jaws +36 (fire, magical, reach 20 feet), **Damage** 4d12+12 piercing plus 1d8 persistent fire
**Melee** [one-action] horn +34 (magical, reach 20 feet), **Damage** 3d12+16 piercing
**Melee** [one-action] claw +36 (agile, magical, reach 15 feet), **Damage** 4d10+12 slashing
**Melee** [one-action] tail +34 (magical, reach 25 feet), **Damage** 4d8+12 bludgeoning
**Melee** [one-action] wing +34 (agile, magical, reach 20 feet), **Damage** 4d8+12 slashing
**All Becomes Flame** [one-action] (curse, fire, primal) The dragon curses a creature within 60 feet to have its magic replaced with primordial flames. The creature must attempt a DC 39 Will save. Regardless of the result, the target becomes temporarily immune for 1 day.
**Critical Success** The creature is unaffected.
**Success** The creature is cursed for 1 round. While cursed, any damage the cursed creature would deal by any means becomes fire damage, regardless of the original damage type. The cursed creature can temporarily suppress the curse for 1 round as an action.
**Failure** As success, but the curse’s duration is 1 hour.
**Critical Failure** As success, but the curse’s duration is 1 day.
**Draconic Frenzy** [two-actions] The dragon makes two claw Strikes and one wing Strike in any order.
**Draconic Momentum** The dragon recharges their Pyre Breath whenever they score a critical hit with a Strike.
**Pyre Breath** [two-actions] (fire, primal) The dragon breathes a blast of flame that deals 18d6 fire damage in a 60-foot cone (DC 41 basic Reflex save). Creatures that critically fail their save catch fire, taking 2d6 persistent fire damage. The area then fills with black smoke for 1 minute. This has the effects of mist, except it fills the cone’s area. The dragon can’t use Pyre Breath again for 1d4 rounds.
**Stoke the Flames** [one-action] (fire, primal) The dragon intensifies nearby fires. Every foe within 60 feet that is taking persistent fire damage takes 5d6 fire damage.
`,we={Grab:"Захват",Knockdown:"Нокдаун","Reactive Strike":"Реагирующий удар",Ferocity:"Свирепость","Aquatic Ambush":"Водная засада",Buck:"Брыкаться",Rend:"Раздирать",Trample:"Растоптать","Frightful Presence":"Устрашающее присутствие"},ye=`35 футов
**Требования** Монстр прячется в воде, а существо, которое его не обнаружило, находится в пределах указанного числа футов.
**Эффект** Монстр перемещается к вызвавшему реакцию существу на расстояние до своей скорости плавания + 10 футов, по воде и по суше. Как только существо оказывается в досягаемости, монстр совершает по нему Удар. Против этого Удара существо {link:1|застигнуто врасплох}.`,V=i=>`${i}
В строке «Раздирать» указан один из Ударов монстра.
**Требования** Монстр попал по одному врагу двумя Ударами указанного вида подряд в одном раунде.
**Эффект** Монстр автоматически ещё раз наносит этому врагу урон этого Удара.`,ve={"zombie-shambler":{name:"Зомби-шатун",f:{slow:{n:"Медлительность",t:"Зомби постоянно {link:1|замедлен 1} и не может использовать реакции."},"zombie-bite":{n:"Укус зомби",rq:"Зомби держит существо {link:1|схваченным} или {link:2|обездвиженным}",t:"Зомби совершает по этому существу безоружный рукопашный Удар челюстями с модификатором атаки +7, наносящий {damage:1} колющего урона."}}},brownie:{name:"Брауни",f:{"baffling-bluff":{n:"Сбивающая с толку уловка",t:`Проделки брауни сбивают существо с толку. Брауни выбирает одно существо в пределах 30 футов; оно должно совершить спасбросок Воли КС {check:1}. Цель получает временный иммунитет к Сбивающей с толку уловке на 1 минуту.
**Критический успех** Цель не затронута.
**Успех** Цель на мгновение обманута и {link:1|застигнута врасплох} против следующего рукопашного Удара брауни по ней до конца следующего хода брауни.
**Провал** Цель в {link:2|замешательстве} на 1 раунд.
**Критический провал** Цель в {link:3|замешательстве} на 1 минуту. В конце каждого своего хода она может совершить новый спасбросок, чтобы избавиться от {link:4|замешательства}.`}}},wolf:{name:"Волк",f:{"pack-attack":{n:"Атака стаей",t:"Удары волка наносят {damage:1} дополнительного урона существам, находящимся в досягаемости как минимум двух союзников волка."}}},guard:{name:"Стражник",f:{}},cultist:{name:"Культист",f:{"fanatical-frenzy":{n:"Фанатичное исступление",rq:"Культист получил урон и не {link:1|утомлён} и уже не в исступлении",t:"Культист впадает в исступление на 1 минуту. В исступлении культист получает бонус состояния +1 к броскам атаки и бонус состояния +2 к броскам урона, а также штраф −2 к КБ. Культист не может прекратить исступление по своей воле. После исступления культист {link:2|утомлён}."}}},boar:{name:"Кабан",f:{"boar-charge":{n:"Атака кабана",t:"Кабан дважды Перемещается, а затем совершает Удар клыком. Если он переместился хотя бы на 20 футов, он получает бонус обстоятельства +2 к броску атаки."}}},crocodile:{name:"Крокодил",f:{"deep-breath":{n:"Глубокий вдох",t:"Крокодил может задерживать дыхание примерно на 2 часа."},"aquatic-ambush":{n:"Водная засада",t:ye},"death-roll":{n:"Смертельное вращение",rq:"Крокодил держит существо {link:1|схваченным}",t:"Крокодил поджимает лапы и быстро вращается, выкручивая жертву. Он совершает Удар челюстями с бонусом обстоятельства +2 к броску атаки по {link:2|схваченному} существу. При попадании он также сбивает существо с ног — оно оказывается {link:3|ничком}. При неудаче он отпускает существо."}}},"kobold-trapper":{name:"Кобольд-ловушечник",f:{"booby-trapped":{n:"С сюрпризом",t:"Кобольд-ловушечник защищает вещи в рюкзаке ловушкой. Чтобы её заметить, нужна успешная проверка Восприятия КС {check:1}, а чтобы обезвредить — две успешные проверки Воровства КС {check:2}. Если открыть рюкзак, не обезвредив ловушку, его содержимое уничтожается, а щепки разлетаются взрывом радиусом 10 футов с центром на рюкзаке, нанося {damage:1} колющего урона (простой спасбросок Рефлекса КС {check:3})."},"construct-trap":{n:"Собрать ловушку",t:"Кобольд-ловушечник сооружает примитивную ловушку на поверхности соседней клетки. Ловушка срабатывает, когда существо в следующий раз оказывается рядом с ней. Существо получает {damage:1} дробящего, колющего или рубящего урона (вид выбирает ловушечник, когда собирает ловушку), простой спасбросок Рефлекса КС {check:1}. При провале существо также получает штраф состояния −5 ко всем скоростям на 1 минуту. Ловушка разрушается, когда срабатывает, или через 8 часов — что наступит раньше. Обычно ловушечник носит с собой материалов на шесть ловушек в день."}}},"bugbear-prowler":{name:"Багбир-лазутчик",f:{bushwhack:{n:"Нападение из засады",t:"Багбир-лазутчик Перемещается на расстояние до 10 футов и пытается Захватить существо, для которого он {link:1|необнаружен}. При успехе он также наносит этому существу урон кулака."},mauler:{n:"Терзатель",t:"Багбир-лазутчик получает бонус обстоятельства +3 к броскам урона по существам, которых он держит {link:1|схваченными}."}}},"gang-leader":{name:"Главарь банды",f:{"deny-advantage":{n:"Не дать преимущества",t:"Главарь банды не {link:1|застигнут врасплох} существами 7-го уровня и ниже, которые спрятались, {link:2|не обнаружены}, берут его в клещи или нападают внезапно."},"evasive-reflexes":{n:"Увёртливость",t:"Когда главарь банды получает успех в спасброске Рефлекса, вместо этого он получает критический успех."},"nimble-dodge":{n:"Проворное уклонение",tr:"Главаря банды выбирает целью атаки атакующий, которого он видит",t:"Главарь банды получает бонус обстоятельства +2 к КБ против вызвавшей реакцию атаки."},"brutal-rally":{n:"Жестокий клич",tr:"Главарь банды совершает критическое попадание по существу",t:"Все союзники, видящие главаря банды, получают бонус обстоятельства +1 к броскам атаки до начала следующего хода главаря."},"gang-up":{n:"Всей толпой",t:"Любой враг {link:1|застигнут врасплох} против рукопашных атак главаря банды из-за взятия в клещи, пока он в рукопашной досягаемости и главаря, и одного из его союзников."},"quick-draw":{n:"Быстрое выхватывание",t:"Главарь банды Взаимодействует, чтобы выхватить оружие, а затем совершает этим оружием Удар."},"sneak-attack":{n:"Внезапная атака",t:"Главарь банды наносит {link:1|застигнутым врасплох} существам дополнительно {damage:1} точного урона."},"surprise-attacker":{n:"Внезапный налёт",t:"В первом раунде боя существа, которые ещё не действовали, {link:1|застигнуты врасплох} главарём банды."}}},"bear-grizzly":{name:"Медведь гризли",f:{mauler:{n:"Терзатель",t:"Медведь гризли получает бонус обстоятельства +2 к броскам урона по существам, которых он держит {link:1|схваченными}."},rush:{n:"Рывок",t:"Медведь гризли Перемещается и в конце движения совершает Удар. Во время этого Перемещения медведь получает бонус обстоятельства +10 футов к скорости."}}},"wolf-dire":{name:"Лютый волк",f:{buck:{n:"Брыкаться",t:`КС {check:1}
Большинство монстров, на которых ездят верхом, могут попытаться сбросить нежеланного или надоедливого всадника, но обычно не делают этого с тем, кому доверяют, если их не напугали и с ними не обращались дурно.
**Триггер** Существо садится на монстра (Оседлать) или, сидя на нём, использует действие «Команда животному».
**Эффект** Вызвавшее реакцию существо должно преуспеть в спасброске Рефлекса против указанного КС, иначе падает с монстра и оказывается {link:1|ничком}. При критическом провале оно также получает {damage:1|дробящего урона} вдобавок к обычному урону от падения.`},"pack-attack":{n:"Атака стаей",t:"Удары лютого волка наносят {damage:1} дополнительного урона существам, находящимся в досягаемости как минимум двух союзников волка."},worry:{n:"Трепать",rq:"Лютый волк держит в челюстях {link:1|схваченное} или {link:2|обездвиженное} существо",t:"Лютый волк яростно треплет существо зубами, нанося {damage:1} урона, простой спасбросок Стойкости КС {check:1}."}}},cockatrice:{name:"Кокатрикс",f:{calcification:{n:"Окаменение плоти",t:"Клевок кокатрикса делает плоть поражённого существа твёрдой. Цель должна преуспеть в спасброске Стойкости КС {check:1}, иначе становится {link:1|замедленной 1} ({link:2|замедленной 2} при критическом провале). Каждый следующий проваленный спасбросок против окаменения плоти увеличивает значение состояния {link:3|замедлен}. Когда окаменение плоти сводит число действий существа к 0, существо становится {link:4|окаменевшим}. Если существо не {link:5|окаменело}, состояние {link:6|замедлен} проходит, когда минует 1 минута без проваленных спасбросков против окаменения плоти. Каждые 24 часа после того, как жертва стала {link:7|окаменевшей}, она может совершить спасбросок Стойкости КС {check:2}, чтобы прийти в себя. При успехе она снова становится плотью, но следующие 24 часа {link:8|замедлена 1}. При критическом успехе существо восстанавливается и не {link:9|замедлено}. При провале существо остаётся {link:10|окаменевшим}, но может попробовать снова через 24 часа. При критическом провале окаменение навсегда, и больше пытаться нельзя."}}},wight:{name:"Умертвие",f:{"grave-weapon":{n:"Могильное оружие",t:"Умертвие связано с кинжалом, с которым его похоронили. Другие умертвия могут быть связаны с другим оружием."},"final-spite":{n:"Последняя злоба",tr:"ОЗ умертвия опускаются до 0",t:"Умертвие совершает Удар, прежде чем будет уничтожено. Этот Удар может наложить разлагающую злобу, но подпитка злобой не действует."},"fueled-by-spite":{n:"Подпитка злобой",t:"Каждый раз, когда существо теряет ОЗ из-за проклятия разлагающей злобы, наложенного умертвием, умертвие получает 3 временных ОЗ."},"corrupting-spite":{n:"Разлагающая злоба",t:"Безоружные атаки умертвия и связанное с ним оружие накладывают проклятие, от которого существо слабеет и озлобляется. Если умертвие накладывает разлагающую злобу на существо, уже поражённое ею, жертва совершает новый спасбросок, а результат лучше провала не учитывается. Живой гуманоид, умерший под действием проклятия, через 1d4 раунда встаёт умертвием под властью умертвия, убившего его. Порождённое умертвие не может накладывать разлагающую злобу и {link:1|неуклюже 2}. Если его создатель погибнет или примерно через месяц существования, новое умертвие обретает самостоятельность и становится обычным умертвием; **Спасбросок** Стойкость КС {check:1}; **Стадия 1** {link:2|истощён 1} (1 раунд); **Стадия 2** {link:3|истощён 2} и не считает союзниками никаких существ (1 раунд); **Стадия 3** как стадия 2, но {link:4|истощён 3} (1 раунд); **Стадия 4** как стадия 2, но {link:5|истощён 4} (1 раунд)."}}},"great-cat-tiger":{name:"Тигр",f:{pounce:{n:"Прыжок на добычу",t:"Тигр Перемещается и в конце движения совершает Удар. Если в начале этого действия тигр прятался, он остаётся спрятанным до окончания Удара этой способности."},"sneak-attack":{n:"Внезапная атака",t:"Тигр наносит {link:1|застигнутым врасплох} существам дополнительно {damage:1} точного урона."},wrestle:{n:"Борьба",t:"Тигр совершает Удар когтем по существу, которое он держит. При попадании это существо сбито с ног и оказывается {link:1|ничком}."}}},kelpie:{name:"Келпи",f:{"captivating-lure":{n:"Пленительная приманка",t:`Келпи внушает одному существу в пределах 60 футов непреодолимое влечение к себе. Цель видит в келпи желанного человека (если келпи в облике гуманоида) или великолепного скакуна (если келпи в облике коня) и должна совершить спасбросок Воли КС {check:1}.
**Критический успех** Существо не затронуто и получает временный иммунитет к Пленительной приманке на 24 часа.
**Успех** Существо {link:1|одурманено 1} на 1 раунд, затем получает временный иммунитет к Пленительной приманке на 24 часа.
**Провал** Существо {link:2|заворожено} и должно тратить все свои действия на то, чтобы как можно быстрее приблизиться к келпи, обходя явные опасности. Если пленённое существо находится рядом с келпи, оно пытается сесть на келпи верхом (если келпи в облике коня) или стоит на месте и ничего не делает. Если келпи атакует существо или если существо, не умеющее дышать под водой, входит в воду, оно освобождается от пленения в конце хода келпи.
**Критический провал** Как провал, но цель не считает воду опасностью и войдёт в воду, даже если не умеет плавать или дышать под водой. Если келпи атакует её или она начинает тонуть, в начале своего следующего хода она может совершить новый спасбросок, но автоматически не освобождается.`},"change-shape":{n:"Изменение формы",t:"Келпи может принять облик любого Среднего или Большого животного конской породы (например, лошади, гиппокампа или пони) или любого Маленького или Среднего гуманоида. Это не меняет её скоростей, а также модификаторов атаки и урона её Ударов."}}},"ice-troll":{name:"Ледяной тролль",f:{"easily-misled":{n:"Легко обмануть",t:"Ледяной тролль получает штраф обстоятельства −4 к КС Восприятия против проверок Обмана."},"furious-carve":{n:"Яростная рубка",tr:"Ледяной тролль получает урон огнём или звуком",t:"Тролль совершает Удар топориком или когтем по случайному существу в досягаемости. Если ледяной тролль получает продолжительный урон огнём, он совершает чистую проверку КС 15, чтобы избавиться от него."},"brutal-sweep":{n:"Жестокий взмах",rq:"Ледяной тролль держит топорик",t:"Тролль описывает топориком широкую дугу, нанося {damage:1} рубящего урона всем существам в эманации 5 футов (простой спасбросок Рефлекса КС {check:1})."},"ice-passage":{n:"Ледяной путь",t:"Ледяному троллю не мешает трудная местность из снега или льда, и ему не нужны проверки Акробатики, чтобы не упасть на скользком льду."},rend:{n:"Раздирать",t:V("коготь")}}},"goblin-scavenger":{name:"Гоблин-старьёвщик",f:{"big-boom-gun":{n:"Большая бабахалка",t:"Ружьё старьёвщика — до смешного огромная ручная пушка с трейтом «фатальное d12» и шагом дистанции 20 футов. Если Удар ею — критический провал, оружие даёт осечку и взрывается, нанося владельцу {damage:1} урона огнём. Это воинское одноручное оружие, нагрузка 2, цена 10 зм. У него трейты «необычное», «сварганенное» и «гоблин». Трейт «сварганенное» означает, что при проваленном броске атаки этим ружьём владелец должен преуспеть в чистой проверке КС 5, иначе оружие даёт осечку."},"finders-keepers":{n:"Что упало, то пропало",tr:"Существо в пределах 15 футов роняет предмет",rq:"У гоблина-старьёвщика свободна рука",t:"Гоблин-старьёвщик Перемещается на расстояние до своей скорости в соседнюю с предметом клетку и Взаимодействует, чтобы его поднять. Движение, как обычно, вызывает реакции, а действие Взаимодействовать, чтобы поднять предмет, — нет."},"fireworks-barrage":{n:"Шквал фейерверков",rq:"У гоблина-старьёвщика свободна рука",t:`Гоблин-старьёвщик достаёт связку фейерверков и запускает её в точку в пределах 60 футов, где они взрываются, нанося {damage:1} урона огнём и {damage:2} урона звуком во взрыве радиусом 10 футов. Каждое существо в области должно совершить спасбросок Рефлекса КС {check:1}.
**Критический успех** Существо не затронуто. Гоблин-старьёвщик понимает, что это потому, что один фейерверк упал ему под ноги, и получает {damage:3} урона огнём, когда тот взрывается у него перед носом.
**Успех** Существо получает половину урона.
**Провал** Существо получает полный урон и на 1 раунд {link:1|ослеплено светом} и {link:2|оглохло}.
**Критический провал** Как провал, но существо также {link:3|ошеломлено 1}.`},"one-person-s-junk":{n:"Кому хлам, а кому клад",t:"Гоблин-старьёвщик чутьём знает, как пустить хлам в дело. Когда он использует оружие с трейтом «гоблин» или импровизированное оружие, он наносит урон ещё одной костью (уже учтено в Ударах выше)."}}},"orc-gamekeeper":{name:"Орк-егерь",f:{"insistent-command":{n:"Настойчивая команда",t:"Когда егерь получает успех в «Команде животному», вместо этого он получает критический успех; если он получает критический провал — вместо этого провал."},"play-chicken":{n:"Кто первый моргнёт",tr:"Соседний враг промахивается по егерю рукопашной атакой",t:"Егерь пытается поймать зарвавшегося противника и пытается его Захватить."},"animal-tandem":{n:"В паре со зверем",t:"Орк-егерь совершает Удар по существу, соседнему с одним из животных-союзников егеря. При попадании животное-союзник наносит цели урон одной костью — самой большой костью урона среди своих безоружных атак."}}},basilisk:{name:"Василиск",f:{"petrifying-glance":{n:"Каменящий взгляд",tr:"Существо в пределах 30 футов, которое видит василиск, начинает свой ход",t:"Цель должна совершить спасбросок Стойкости КС {check:1}. При провале она {link:1|замедлена 1} на 1 минуту: её тело медленно цепенеет."},"petrifying-gaze":{n:"Каменящий взор",t:"Василиск пристально смотрит на существо, которое видит, в пределах 30 футов. Это существо должно совершить спасбросок Стойкости КС {check:1}. Если оно проваливает спасбросок и ещё не было {link:1|замедлено} Каменящим взглядом или этой способностью, оно становится {link:2|замедленным 1}. Если существо уже было {link:3|замедлено} этой способностью или Каменящим взглядом, проваленный спасбросок делает его {link:4|окаменевшим} навсегда. Существо, {link:5|окаменевшее} таким образом, мгновенно снова становится плотью, если его облить (а не просто обрызгать) свежей кровью василиска не старше 1 часа. Крови одного василиска хватает, чтобы облить 1d4 Средних существ."}}},yeti:{name:"Йети",f:{snowblind:{n:"Снежная слепота",t:"Когда йети Прячется, любой снегопад делает его скрытым, даже если снег недостаточно густой, чтобы скрыть других существ."},"nightmare-guardian":{n:"Страж от кошмаров",t:"Йети получают бонус состояния +4 к спасброскам против страха, а также заклинаний и способностей, влияющих на сны. Йети, ставший жертвой сверхъестественного кошмара, теряет эту способность и навсегда приходит в ярость, получая бонус состояния +1 к броскам атаки и урона и штраф состояния −1 к КБ."},vanish:{n:"Исчезнуть",tr:"Вне боя йети прячется или {link:1|не обнаружен}, а существо вот-вот его заметит",t:"Йети Перемещается или Карабкается на расстояние до половины своей скорости туда, где может Спрятаться, а затем Прячется. Если результат его новой проверки Скрытности не ниже КС Восприятия вызвавшего реакцию существа, йети остаётся спрятанным."},"arctic-passage":{n:"Арктический путь",t:"Йети не замечает трудной местности из льда или снега."},"grisly-arrival":{n:"Жуткое появление",tr:"Йети попадает по существу в первом раунде боя, а в начале боя йети был спрятан от этого существа",t:"Каждый враг в пределах 30 футов, видевший атаку (включая её цель), должен совершить спасбросок Воли КС {check:1}. При провале существо {link:1|напугано 2}, при критическом провале — {link:2|напугано 4}."},rend:{n:"Раздирать",t:V("коготь")}}},necromancer:{name:"Некромант",f:{"stench-of-decay":{n:"Смрад тления",t:"От некроманта исходит запах гнили в эманации 5 футов. Живое существо, которое входит в ауру или начинает в ней ход, получает {link:1|тошноту 1}."},"undead-arise":{n:"Нежить, восстань!",t:"Некромант призывает две Средние сущности нежити в разные свободные клетки на расстоянии до 30 футов. По выбору некроманта сущности выглядят как зомби, скелеты или призраки. Сущности преграждают путь, как существа, и их можно атаковать. У каждой сущности 1 ОЗ, а КБ и спасброски — как у некроманта. Своих действий у них нет, и они распадаются, если ОЗ некроманта опускаются до 0. Одновременно у некроманта может быть до четырёх сущностей нежити. Если он призывает ещё одну, самая старая распадается."},"undead-attack":{n:"Нежить, в атаку!",rq:"У некроманта есть хотя бы одна активная сущность нежити",t:"Некромант приказывает всем своим сущностям нежити атаковать. Каждая сущность может Переместиться на расстояние до 20 футов в свободную клетку и совершить Удар. У Удара модификатор атаки +15, он наносит {damage:1} дробящего урона (или духовного, если сущность — дух). У Удара трейт «магический», и штраф за множественную атаку к нему не применяется."},"wave-of-death":{n:"Волна смерти",rq:"Некромант не истощён, и у него есть хотя бы одна активная сущность нежити",t:"Некромант переполняет свои сущности нежити энергией пустоты, и все они взрываются. Каждая сущность уничтожается, нанося {damage:1} урона пустотой каждому существу в эманации 10 футов, простой спасбросок Стойкости КС {check:1}. Существо, попавшее в несколько взрывов, получает урон только один раз. Некромант становится {link:1|истощённым 1}."}}},watchmage:{name:"Маг-дозорный",f:{"arcane-watch":{n:"Магический дозор",t:"Маг-дозорный может Исследовать или Искать, одновременно используя исследовательское действие «Обнаружение магии»."},"counter-escape":{n:"Пресечь побег",tr:"Существо Сотворяет заклинание с трейтом «телепортация» или как реакцию",t:"Маг-дозорный тратит ячейку заклинания того же или более высокого ранга, что и заклинание вызвавшего реакцию существа, и пытается противодействовать этому заклинанию (модификатор противодействия +11)."},"eldritch-arms":{n:"Колдовское оружие",t:"За короткий ритуал длиной 10 минут маг-дозорный выбирает одно оружие или безоружную атаку, через которые может направлять свою магию. Удары мага этим оружием магические и наносят дополнительно {damage:1} урона силой."},"spellbound-strike":{n:"Зачарованный удар",rq:"Маг-дозорный держит оружие, выбранное Колдовским оружием",t:"Маг-дозорный Сотворяет заклинание в 1 или 2 действия, вкладывая его в оружие, и совершает этим оружием Удар. Для штрафа за множественную атаку это считается двумя атаками. При попадании на цель также действует заклинание, но цель получает все обычные защиты от него. Если у заклинания есть цели, его целью становится существо, по которому пришёлся удар, и больше никто. Если заклинание действует на область, цель должна оказаться в области. Взрыв центрируется на углу клетки цели, если она Средняя или меньше, или на углу клетки, ближайшем к центру существа, если оно Большое или больше. Конус или линия исходят из выбранной магом клетки, соседней с целью."}}},"will-o-wisp":{name:"Блуждающий огонёк",f:{glow:{n:"Свечение",t:"20 футов. Блуждающий огонёк по природе невидим, но светится цветным светом, давая яркий свет в ауре, и потому виден."},"magic-immunity":{n:"Иммунитет к магии",t:"Блуждающий огонёк невосприимчив ко всем заклинаниям, кроме шквала силы, загадки и разоблачающего света."},"feed-on-fear":{n:"Питаться страхом",fq:"раз в раунд",rq:"Враг в пределах 15 футов находится под действием эффекта страха или при смерти",t:"Блуждающий огонёк питается ужасом существа. Он восстанавливает 2d4 ОЗ, а если он Погас, его свечение вспыхивает снова."},"go-dark":{n:"Погаснуть",t:"Блуждающий огонёк гасит своё свечение и становится невидимым. Он может прекратить этот эффект, снова использовав это действие. Если он невидимым использует атаку разрядом, дуга электричества выдаёт его место любому наблюдателю, и до своего перемещения блуждающий огонёк для всех наблюдателей лишь спрятан."}}},wraith:{name:"Рэйф",f:{"sunlight-powerlessness":{n:"Бессилие на солнце",t:"На солнечном свету рэйф {link:1|ослеплён} и {link:2|замедлен 2}."},"grip-of-fear":{n:"Хватка страха",t:"Рэйф проникает в грудь соседнего существа и сжимает его сердце. Цель получает {damage:1} ментального урона, простой спасбросок Воли КС {check:1}. При критическом провале существо также {link:1|парализовано} до начала следующего хода рэйфа."},"robes-of-welcome":{n:"Объятия мантии",fq:"раз в раунд",t:"Рэйф окутывает мантией соседнее живое существо, подвергая его объятиям пустоты. Если какое-либо существо уже проклято объятиями пустоты этого рэйфа, рэйф не может наложить их на другое существо."},"void-s-embrace":{n:"Объятия пустоты",t:"Если жертва преуспевает в спасброске против этого проклятия на солнечном свету, проклятие заканчивается. Пока на вас это проклятие, вы преодолеваете сопротивление проклявшего вас рэйфа; **Спасбросок** Воля КС {check:1}; **Стадия 1** при любом освещении жертва {link:1|ослеплена светом} (1 час); **Стадия 2** жертва получает чувство жизни 30 футов, но при любом освещении {link:2|ослеплена} (1 час); **Стадия 3** как стадия 2, но у существа также исцеление пустотой (1 час); **Стадия 4** жертва {link:3|без сознания} и не может очнуться (1 день); **Стадия 5** существо умирает и становится рэйфом, а его тело рассыпается пеплом"}}},"cave-giant":{name:"Пещерный великан",f:{"forceful-fracture":{n:"Сокрушительный раскол",rq:"В досягаемости пещерного великана есть камень любого рода",t:"Пещерный великан бьёт кулаком по камню рядом, раскалывая его на куски, чтобы метать в других существ. Затем великан совершает два дистанционных Удара камнем, каждый — по другому существу. Обе атаки учитываются в штрафе за множественную атаку, но штраф не растёт, пока он не совершит обе."},smear:{n:"Размазать",rq:"В досягаемости пещерного великана есть существо, стоящее рядом со стеной или другой твёрдой вертикальной поверхностью",t:"Пещерный великан хватает существо и бьёт его о стену. Великан совершает проверку Атлетики против КС Рефлекса цели. При успехе пещерный великан Захватывает существо и размазывает его по стене, нанося {damage:1} дробящего урона. При критическом успехе урон удваивается."}}},"big-boss-goblin":{name:"Большой босс гоблинов",f:{"not-me":{n:"Только не я!",tr:"Большого босса гоблинов выбирают целью атаки, а рядом с ним стоит гоблин",t:"Большой босс гоблинов дёргает гоблина под атаку, чтобы тот ответил за всё вместо него. Босс получает бонус обстоятельства +2 к КБ против вызвавшей реакцию атаки. При попадании большой босс гоблинов получает половину урона, а другой гоблин — остальное."},"no-fight-fair":{n:"Без честных боёв",t:"Большой босс гоблинов дерётся грязно, подрубая врагам сухожилия. Каждый раз, когда босс попадает по {link:1|застигнутому врасплох} врагу, существо получает штраф состояния −5 футов к скорости (−10 футов при критическом попадании), пока не восстановит хоть сколько-нибудь ОЗ. Как и любые штрафы к скорости, этот не может опустить скорость существа ниже 5 футов."},"stab-it-stab-it-stab-it":{n:"Коли! Коли! Коли!",t:"Большой босс гоблинов выбирает видимую цель в пределах 30 футов и приказывает союзным гоблинам атаковать. Один гоблин ниже уровнем, чем большой босс, стоящий рядом с целью, может сразу использовать реакцию, чтобы совершить Удар по цели. Кроме того, до начала следующего хода большого босса гоблинов, пока он ведёт их, их атаки по этой цели наносят {damage:1} дополнительных костей урона."}}},"graveknight-captain":{name:"Рыцарь могилы, капитан",f:{"graveknight-s-shield":{n:"Щит рыцаря могилы",t:"Проклятие рыцаря могилы распространяется и на его щит — или его доспех выделяет часть себя, чтобы создать щит. У рыцаря могилы есть щит с характеристиками прочного щита уровня не выше уровня рыцаря − 1. Щит отчасти самостоятелен и сам защищает рыцаря. Когда щит поднят, он сам использует Блок щитом, чтобы уменьшить урон от первой атаки по рыцарю в каждом раунде, и рыцарю не нужно тратить на это реакцию. Щит сам возрождается вместе с рыцарем, и уничтожить его нужно так же, как доспех рыцаря могилы."},"devastating-blast":{n:"Опустошительный выброс",t:"Рыцарь могилы выпускает конус энергии длиной 30 футов. Существа в области получают {damage:1} урона кислотой по области, простой спасбросок Рефлекса КС {check:1}. Рыцарь могилы может использовать эту способность раз в 1d4 раунда."},"graveknight-s-curse":{n:"Проклятие рыцаря могилы",t:`Носить доспех рыцаря могилы очень опасно: сущность рыцаря неизбежно убивает носителя, превращая его плоть в новое тело рыцаря. Снятие проклятия позволяет снять доспех, но если снова его надеть, проклятие вернётся. Если носитель умирает от другой причины, пока на нём доспех, или если возрождение рыцаря завершается раньше, чем носитель умрёт от проклятия, носитель сразу переходит к стадии 3.
Проклятие действует на любого, кто носит доспех рыцаря могилы хотя бы 1 час; **Спасбросок** Воля КС {check:1}; **Начало** 1 час; **Стадия 1** {link:1|обречён 1} и не может снять доспех (1 день); **Стадия 2** {link:2|обречён 2}, штраф состояния −10 футов к скоростям, не может снять доспех (1 день); **Стадия 3** умирает и превращается в рыцаря могилы этого доспеха.`},"ruinous-weapons":{n:"Губительное оружие",t:"Любое оружие и любая безоружная атака рыцаря могилы получает эффекты оружия +1 разящего и руны едкого оружия."}}},"young-whisper-dragon":{name:"Молодой шепчущий дракон",f:{"information-network":{n:"Сеть осведомителей",t:"Дракон может совершить проверку Общества, чтобы Вспомнить информацию, вместо проверки, чтобы Собрать информацию: он припоминает сведения от прежних осведомителей."},"diplomatic-solution":{n:"Дипломатическое решение",tr:"Дракон бросает инициативу",t:"Дракон выбирает целью всех видимых врагов в пределах 60 футов заклинанием «спокойствие», усиленным до ранга, равного половине уровня дракона с округлением вверх (спасбросок Воли КС {check:1}). Дракону не нужно Поддерживать этот эффект, но если он совершит враждебное действие против затронутых, эффект прерывается для всех существ."},"distracting-whisper":{n:"Отвлекающий шёпот",tr:"Дракона выбирают целью атаки",t:"Таинственный голос шепчет на ухо вызвавшему реакцию существу что-то тревожное: вызвавшая реакцию атака получает штраф обстоятельства −2."},"cogitation-breath":{n:"Дыхание раздумий",t:"Дракон выдыхает сбивающие с толку миазмы, нанося {damage:1} ментального урона в конусе 30 футов (простой спасбросок Воли КС {check:1}). Существо, проваливающее спасбросок, {link:1|одурманено 1} ({link:2|одурманено 2} при критическом провале) на 1 минуту. Дракон не может снова использовать Дыхание раздумий 1d4 раунда."},"draconic-frenzy":{n:"Драконье неистовство",t:"Дракон совершает два Удара когтями и один Удар хвостом в любом порядке."},"draconic-momentum":{n:"Драконий напор",t:"Дракон восстанавливает Дыхание раздумий каждый раз, когда совершает критическое попадание Ударом."},"steal-knowledge":{n:"Похитить знание",t:`Дракон вырывает обрывок знаний из разума существа в пределах 60 футов, выбирая навык. Существо должно совершить спасбросок Воли КС {check:1}.
**Успех** Существо не затронуто.
**Провал** В течение следующей минуты существо получает штраф состояния −1 к проверкам этого навыка, а дракон — бонус состояния +1 к использованию этого навыка.
**Критический провал** Как провал, но штраф −2, а бонус +2.`}}},chimera:{name:"Химера",f:{"multiple-reactions":{n:"Несколько реакций",t:"Химера получает в каждом раунде 2 дополнительные реакции, которые может использовать только для Реагирующих ударов. Для каждой реакции она должна использовать разную голову и не может использовать больше одной на одно и то же вызвавшее реакцию действие. Если она теряет одну из голов, она теряет и одну из этих дополнительных реакций."},"three-headed":{n:"Трёхголовая",t:"Любая способность, которая отсекла бы химере голову (например, критическое попадание оружием-головорубом), отсекает одну голову наугад. Потеря головы не убивает химеру (пока у неё остаётся хотя бы одна голова), но она не может совершать Удары потерянной головой и использовать её Драконье дыхание."},"draconic-bite":{n:"Драконий укус",t:"Драконья голова химеры наносит дополнительно {damage:1} урона того типа, что наносит её Драконье дыхание."},"dragon-breath":{n:"Драконье дыхание",t:`Химера выдыхает конус или линию, нанося {damage:1} урона всем существам в области (простой спасбросок КС {check:1}, вид спасброска — ниже). Драконья голова химеры связана с одной из традиций магии; от неё зависят область Драконьего дыхания, тип урона и спасбросок против него. Способность получает соответствующие трейты. Химера не может снова использовать Драконье дыхание 1d4 раунда.
Арканная: линия 60 футов, сила (Рефлекс)
Сакральная: линия 60 футов, духовный урон (Рефлекс); у способности может быть также трейт «святой» или «нечестивый»
Оккультная: конус 30 футов, ментальный урон (Воля)
Природная: конус 30 футов, кислота, холод, электричество, огонь или звук (Рефлекс) либо яд (Стойкость)`},"three-headed-strike":{n:"Удар тремя головами",t:"Химера совершает Удар драконьими челюстями, львиными челюстями и козлиными рогами, каждый со штрафом −2 и по разным существам. Для штрафа за множественную атаку эти Удары считаются одной атакой, и штраф не растёт, пока она не совершит все три атаки."}}},"two-headed-troll":{name:"Двухголовый тролль",f:{"easily-misled":{n:"Легко обмануть",t:"Двухголовый тролль получает штраф обстоятельства −4 к КС Восприятия против проверок Обмана."},"independent-brains":{n:"Два мозга",t:"Каждая голова двухголового тролля бросает свою инициативу и ходит в свой ход. Ни одна голова не может Выждать. В начале хода головы она получает 2 действия и 1 реакцию. Каждый мозг управляет одной рукой, но ногами могут двигать оба. Способность или предмет, отсекающие двухголовому троллю голову (например, оружие-головоруб), не убивают его, пока у него остаётся другая голова, но он теряет ходы, действия и реакции отсечённой головы. Ментальные эффекты, нацеленные на одно существо, действуют только на одну из голов тролля."},"head-regrowth":{n:"Отращивание головы",t:"Регенерация двухголового тролля может отрастить отсечённую голову. Восстановив ОЗ регенерацией, двухголовый тролль совершает чистую проверку КС 10. При успехе недостающая голова полностью восстанавливается. Если двухголовый тролль теряет последнюю голову, он сразу умирает."},"collaborative-chomp":{n:"Совместный укус",t:"Тролль совершает Удар когтем и Захватывает одну цель. Если и то и другое успешно, другая голова может использовать реакцию, чтобы совершить по этому существу Удар челюстями."}}},"nosferatu-malefactor":{name:"Носферату-злодей",f:{"nosferatu-vulnerabilities":{n:"Уязвимости носферату",t:"У носферату есть следующие уязвимости."},revulsion:{n:"Отвращение",t:"Носферату не может по своей воле приблизиться на 10 футов к выставленному напоказ чесноку или выставленному напоказ религиозному символу божества, допускающего святое освящение. Чтобы выставить напоказ чеснок или религиозный символ, существо должно 1 раунд Взаимодействовать (как при Поднятии щита). Если носферату невольно оказывается в пределах 10 футов от предмета отвращения, он получает состояние {link:1|бегущий} и бежит от предмета, пока не закончит действие дальше 10 футов от него. После 1 раунда рядом с предметом отвращения носферату может одним действием с трейтом «концентрация» совершить спасбросок Воли КС {check:1}. При успехе он преодолевает отвращение на 1d6 раундов (на 1 час при критическом успехе)."},stake:{n:"Кол",t:"Магический деревянный кол (например, с руной мощи оружия, под заклинанием «рунное оружие» или подобной магией), вбитый в сердце носферату, опускает его ОЗ до 0 и не даёт ему лечиться выше 0 ОЗ, даже в своём гробу. Чтобы вбить кол, нужно 3 действия, и это работает, только если носферату {link:1|без сознания}. Если кол вынуть, носферату снова может лечиться выше 0 ОЗ, а если он в гробу, отдых длиной 1 час начинается, когда кол вынут. Если, пока кол на месте, отсечь носферату голову и помазать её святой водой, носферату уничтожен."},sunlight:{n:"Солнечный свет",t:"Под прямым солнечным светом носферату сразу становится {link:1|замедленным 1}. Значение состояния {link:2|замедлен} растёт на 1 каждый раз, когда носферату заканчивает ход на солнце, а состояние проходит, когда он уходит с солнца. Если носферату так теряет все действия, он уничтожен."},"change-shape":{n:"Изменение формы",t:"Носферату превращается в рой бледно-серых крыс. Он получает скорость по земле 30 футов и скорость лазания 10 футов и становится Большим. В облике роя носферату может одним действием нанести каждому врагу в пространстве роя {damage:1} колющего урона, простой спасбросок Рефлекса КС {check:1}. Существо, проваливающее спасбросок, также подвергается чуме древних."},"command-thrall":{n:"Приказ рабу",rq:"Один из рабов носферату рядом и может его слышать",t:"Носферату даёт одному из своих рабов один приказ, который раб в свой следующий ход выполняет, как может."},dominate:{n:"Подчинение",t:"Носферату может по желанию сотворять «подчинение» как врождённое сакральное заклинание. Для этого нужно смотреть цели в глаза, и заклинание получает трейт «визуальный». КС спасброска {check:1}; существо, которое преуспевает, получает временный иммунитет к Подчинению этого носферату на 24 часа. Полное уничтожение носферату прекращает подчинение, но если лишь опустить его ОЗ до 0, заклинание не прервётся."},"drink-blood":{n:"Пить кровь",rq:"Последним действием носферату был успешный Удар клыками",t:"Носферату вонзает клыки в существо-цель, чтобы пить его кровь. Для этого нужна проверка Атлетики против КС Стойкости существа. При успехе существо становится {link:1|истощённым 1}, а носферату восстанавливает 13 ОЗ; лишние ОЗ становятся временными. Если Пить кровь у уже истощённого существа, носферату не восстанавливает ОЗ, но значение истощения существа растёт на 1, и жертва умирает, когда становится {link:2|истощённой 5}. Носферату может пить и кровь, слитую в сосуд, чтобы насытиться, но ОЗ от этого не получает. Значение истощения существа-цели уменьшается на 1 в неделю. Переливание крови — нужна успешная проверка Медицины КС {check:1} и достаточно крови или донор — через 10 минут уменьшает значение истощения на 1."},"plague-of-ancients":{n:"Чума древних",t:"**Спасбросок** Стойкость КС {check:1}; **Начало** 1 день; **Стадия 1** {link:1|истощён 1} (1 день); **Стадия 2** {link:2|истощён 2} и {link:3|ослаблен 2} (1 день); **Стадия 3** {link:4|обречён 1}, {link:5|истощён 3} и {link:6|ослаблен 3} (1 день); **Стадия 4** {link:7|обречён 2}, {link:8|истощён 3} и {link:9|ослаблен 3} (1 день); **Стадия 5** {link:10|без сознания} (1 день); **Стадия 6** смерть"}}},"orc-veteran-master":{name:"Орк-мастер-ветеран",f:{"fly-through-battle":{n:"Сквозь битву",t:"Мастер-ветеран получает в каждом раунде дополнительную реакцию, которую может использовать только для Реагирующей погони."},"reactive-pursuit":{n:"Реагирующая погоня",tr:"Враг в досягаемости пытается отойти",t:"Мастер-ветеран Перемещается на расстояние до своей скорости, следуя за врагом и держа его в досягаемости на протяжении всего движения, пока тот не остановится или мастер не пройдёт всю свою скорость."},"staff-swipe":{n:"Размах посохом",t:"Мастер-ветеран увеличивает досягаемость, чтобы сокрушить посохом бо сразу нескольких существ. Он совершает Удар посохом бо по каждому врагу в конусе 15 футов. Для штрафа за множественную атаку это считается двумя атаками, но штраф не растёт, пока он не совершит все атаки."},"reshape-the-battle":{n:"Изменить ход боя",t:"Мастер-ветеран совершает Удар посохом бо. Если он попадает по существу своего размера или меньше, мастер может автоматически Переставить его в любое место в досягаемости посоха бо."}}},"skeletal-titan":{name:"Скелет-титан",f:{"bone-debris":{n:"Груды костей",t:"Кости, которые метает скелет-титан, так велики, что загромождают поле боя. Когда титан попадает по существу атакой костью, снаряд превращает клетку, где стоит существо, в трудную местность (если существо занимает несколько клеток — одну из них по выбору титана). Если титан промахивается атакой костью, трудной местностью вместо этого становится случайная клетка рядом с существом."},"mountain-slam":{n:"Горный удар",t:"Скелет-титан с размаху бьёт горным мечом о землю. Ударная волна наносит {damage:1} дробящего урона всем существам на линии 20 футов (простой спасбросок Рефлекса КС {check:1}). Существо, проваливающее спасбросок, также сбито с ног и оказывается {link:1|ничком}."},trample:{n:"Растоптать",t:`Огромные или меньше, нога, КС {check:1}
Монстр Перемещается на расстояние до удвоенной скорости и может проходить через клетки существ указанного размера, растаптывая каждое существо, в чью клетку входит. За одно использование монстр может растоптать одно и то же существо только один раз. Монстр наносит урон указанного Удара, но растоптанные существа могут совершить простой спасбросок Рефлекса против указанного КС (без урона при критическом успехе, половина урона при успехе, двойной урон при критическом провале).`}}},"ancient-cinder-dragon":{name:"Древний пепельный дракон",f:{"smoke-vision":{n:"Зрение сквозь дым",t:"Дым не мешает пепельному дракону видеть: он не замечает состояния «скрыт» из-за дыма."},"dragon-heat":{n:"Драконий жар",t:"5 футов, {damage:1} урона огнём (простой спасбросок Рефлекса КС {check:1})"},"frightful-presence":{n:"Устрашающее присутствие",t:`90 футов, КС {check:1}
Существо, впервые оказавшееся в области, должно совершить спасбросок Воли.
При любом результате спасброска существо получает временный иммунитет к Устрашающему присутствию этого монстра на 1 минуту.
**Критический успех** Присутствие на существо не действует.
**Успех** Существо {link:1|напугано 1}.
**Провал** Существо {link:2|напугано 2}.
**Критический провал** Существо {link:3|напугано 4}.`},"boiling-blood":{n:"Кипящая кровь",tr:"По дракону совершают критическое попадание рукопашной атакой",t:"Раскалённая кровь дракона выплёскивается на атакующего. Цель получает {damage:1} урона огнём (простой спасбросок Рефлекса КС {check:1})."},"reactive-strike":{n:"Реагирующий удар",t:`Только челюстями.
**Триггер** Существо в досягаемости монстра использует действие воздействия или передвижения, совершает дистанционную атаку или покидает клетку во время действия передвижения.
**Эффект** Монстр совершает рукопашный Удар по вызвавшему реакцию существу. Если это критическое попадание, а триггером было действие воздействия, монстр срывает это действие. Этот Удар не увеличивает штраф за множественную атаку монстра, и штраф к нему не применяется.`},"all-becomes-flame":{n:"Всё станет пламенем",t:`Дракон проклинает существо в пределах 60 футов: его магия сменяется первородным пламенем. Существо должно совершить спасбросок Воли КС {check:1}. При любом результате цель получает временный иммунитет на 1 день.
**Критический успех** Существо не затронуто.
**Успех** Существо проклято на 1 раунд. Пока оно проклято, любой урон, который оно нанесло бы любым способом, становится уроном огнём, каким бы ни был исходный тип урона. Проклятое существо может одним действием подавить проклятие на 1 раунд.
**Провал** Как успех, но проклятие длится 1 час.
**Критический провал** Как успех, но проклятие длится 1 день.`},"draconic-frenzy":{n:"Драконье неистовство",t:"Дракон совершает два Удара когтями и один Удар крылом в любом порядке."},"draconic-momentum":{n:"Драконий напор",t:"Дракон восстанавливает Погребальное дыхание каждый раз, когда совершает критическое попадание Ударом."},"pyre-breath":{n:"Погребальное дыхание",t:"Дракон выдыхает поток пламени, нанося {damage:1} урона огнём в конусе 60 футов (простой спасбросок Рефлекса КС {check:1}). Существа, критически проваливающие спасбросок, загораются и получают {damage:2} продолжительного урона огнём. Затем на 1 минуту область заполняет чёрный дым. Это действует как заклинание «туман», но заполняет область конуса. Дракон не может снова использовать Погребальное дыхание 1d4 раунда."},"stoke-the-flames":{n:"Раздуть пламя",t:"Дракон раздувает огонь вокруг. Каждый враг в пределах 60 футов, получающий продолжительный урон огнём, получает {damage:1} урона огнём."}}}},Ce={fist:"кулак",shortsword:"короткий меч",jaws:"челюсти",sap:"дубинка",crossbow:"арбалет",dagger:"кинжал",tusk:"клык",tail:"хвост","light hammer":"лёгкий молот",claw:"коготь","bastard sword":"полуторный меч",javelin:"дротик",sling:"праща",beak:"клюв",hatchet:"топорик",dogslicer:"собакорез","big boom gun":"большая бабахалка",whip:"кнут",bola:"бола",shortbow:"короткий лук",shock:"разряд","wraith touch":"касание рэйфа",greataxe:"секира",rock:"камень",horsechopper:"конеруб",warhammer:"боевой молот","dragon jaws":"драконьи челюсти","lion jaws":"львиные челюсти","goat horns":"козлиные рога",club:"дубина",fangs:"клыки","bo staff":"посох бо","composite longbow":"составной длинный лук","mountain sword":"горный меч",foot:"нога",bone:"кость",horn:"рог",wing:"крыло","light mace":"лёгкая булава"},Se={"+1 breastplate":"+1 кираса","+1 full plate":"+1 латы","+1 greataxe":"+1 секира","+1 horsechopper":"+1 конеруб","+1 shortsword":"+1 короткий меч","+1 striking bo staff":"+1 разящий посох бо","+1 striking composite longbow (20 arrows)":"+1 разящий составной длинный лук (20 стрел)",backpack:"рюкзак","bastard sword":"полуторный меч","battered crown (or other symbol of authority)":"помятая корона (или другой символ власти)","big boom gun (10 rounds)":"большая бабахалка (10 зарядов)",bola:"бола","bundle of fireworks":"связка фейерверков",club:"дубина","crossbow (10 bolts)":"арбалет (10 болтов)","crossbow (20 bolts)":"арбалет (20 болтов)","cultist garb (functions as leather armor)":"облачение культиста (как кожаный доспех)",dagger:"кинжал",dogslicer:"собакорез","formula book (containing formulas for three 1st- or 2nd-level snares)":"книга формул (формулы трёх силков 1-го или 2-го уровня)","graveknight’s shield (hardness 8, hp 64, bt 32)":"щит рыцаря могилы (Твёрдость 8, ОЗ 64, ПП 32)","hampering snare":"сдерживающий силок",hatchet:"топорик","hide armor":"шкурный доспех","hooded robe":"мантия с капюшоном",javelin:"дротик","leather armor":"кожаный доспех","lesser healing potion":"малое зелье лечения","light hammer":"лёгкий молот","light mace":"лёгкая булава","moderate glue bomb":"средняя клеевая бомба",net:"сеть","occult text":"оккультный текст",sap:"дубинка","scale mail":"чешуйчатый доспех","shortbow (20 arrows)":"короткий лук (20 стрел)",shortsword:"короткий меч","signal whistle":"сигнальный свисток","sling (10 bullets)":"праща (10 пуль)","spellbook (contains all prepared spells plus earthbind, revealing light, sleep, tailwind)":"книга заклинаний (все подготовленные заклинания, а также земные оковы, разоблачающий свет, сон, попутный ветер)","studded leather":"проклёпанная кожа",warhammer:"боевой молот",whip:"кнут"},Y={Charm:"Очаровать",Clairaudience:"Яснослышание",Clairvoyance:"Ясновидение",Command:"Приказ",Daze:"Ступор","Detect Magic":"Обнаружение магии","Dispel Magic":"Рассеять магию","Embed Message":"Вложить сообщение",Fly:"Полёт","Force Barrage":"Шквал силы",Frostbite:"Обморожение",Haste:"Ускорение",Ignition:"Воспламенение",Light:"Свет",Mending:"Починка",Message:"Сообщение",Prestidigitation:"Престидижитация","Read Aura":"Чтение ауры","See The Unseen":"Увидеть невидимое",Slow:"Замедление",Suggestion:"Внушение","Sure Strike":"Верный удар","Tangle Vine":"Оплетающая лоза","Telekinetic Haul":"Телекинетическая перевозка",Translocate:"Смещение",Ventriloquism:"Чревовещание","Void Warp":"Искажение пустотой"},N={"void healing":"исцеление пустотой","(+8 to find concealed objects)":"(+8 на поиск спрятанных предметов)","(or +2 vs. higher-ranking members of the cult)":"(или +2 против старших членов культа)","(+9 to Seek for traps)":"(+9 к Поиску ловушек)","+1 circumstance to all defenses vs. traps":"+1 обстоятельства ко всем защитам против ловушек","fueled by spite, void healing":"подпитка злобой, исцеление пустотой","regeneration 15 (deactivated by fire or sonic)":"регенерация 15 (отключается огнём или звуком)","ice passage":"ледяной путь","arctic passage":"арктический путь","+4 status to all saves vs. fear and dreams":"+4 состояния ко всем спасброскам против страха и снов","(26 with shield raised)":"(26 с поднятым щитом)","rejuvenation, void healing":"возрождение, исцеление пустотой","(+17 to Sense Motive)":"(+17, чтобы Понять намерение)","telepathy 100 feet":"телепатия 100 футов","+2 status to all saves vs. occult":"+2 состояния ко всем спасброскам против оккультного","regeneration 20 (deactivated by electricity or fire)":"регенерация 20 (отключается электричеством или огнём)","telepathy 60 feet":"телепатия 60 футов","fast healing 10, plagued coffin restoration, void healing":"быстрое исцеление 10, восстановление в чумном гробу, исцеление пустотой","smoke vision":"зрение сквозь дым","+2 status to all saves vs. primal":"+2 состояния ко всем спасброскам против природного","Legal Lore":"Знание законов","Cult Lore (for the cultist’s own cult)":"Знание культа (своего культа)","Underworld Lore":"Знание преступного мира","Warfare Lore":"Знание войны","in water":"в воде","in snow":"в снегу","2d6 energy damage (see draconic bite)":"2d6 урона энергией (см. «Драконий укус»)"};function Ie(i,l){const r={},n={},u={},c={},I={},m=(o,k)=>{o&&k&&(I[o]=k)};for(const o of i){if(!o.id.startsWith(U))continue;const k=ve[o.id.slice(U.length)];if(k){r[Q(o)]={name:k.name};for(const t of o.features){const s=k.f[t.key],P=(s==null?void 0:s.n)??we[t.name];P&&(n[X(o,t)]=P),s&&(m(t.text,s.t),m(t.trigger,s.tr),m(t.requirements,s.rq),m(t.frequency,s.fq))}for(const t of o.strikes){const s=Ce[t.name.toLowerCase()];s&&(c[`strike:${t.name.toLowerCase()}`]=s),m(t.effectText,t.effectText&&N[t.effectText])}for(const t of o.items){const s=Se[t.name.toLowerCase()];s&&(c[`item:${t.name.toLowerCase()}`]=s)}for(const t of[...o.spellcasting,...o.rituals?[o.rituals]:[]])for(const s of t.spells)Y[s.name]&&(u[s.name]={name:Y[s.name]});for(const t of[o.perception.details,o.languages.details,o.ac.details,o.hp.details,o.speed.details,o.saves.all,o.saves.fortitude.details,o.saves.reflex.details,o.saves.will.details])m(t,t&&N[t]);for(const t of o.skills){t.lore&&m(t.key,N[t.key]);for(const s of t.special??[])m(s.label,N[s.label])}}}return{format:ae,version:1,system:te.id,language:ee,title:l,monsters:r,names:n,spells:u,terms:c,texts:I}}const Te={"Monster Core":"pathfinder-monster-core","Monster Core 2":"pathfinder-monster-core-2","NPC Core":"pathfinder-npc-core"};function Pe(){return re(be).map(i=>ie(fe(i),ne("en"),`${U}${i.slug}`,[],Te[i.book]))}export{Pe as builtinCreatures,Ie as builtinPackRu};
