const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname,'db.json');
const initial = {
  users:[
    {id:1,name:'Administrador',email:'admin@passabola.com',password:'123456',role:'admin'},
    {id:2,name:'Usuário',email:'user@passabola.com',password:'123456',role:'user'}
  ],
  teams:[{id:1,name:'Corinthians',points:70},{id:2,name:'Flamengo',points:68},{id:3,name:'Palmeiras',points:66}],
  ranking:[{pos:1,team:'Corinthians',points:70},{pos:2,team:'Flamengo',points:68},{pos:3,team:'Palmeiras',points:66}],
  games:[
    {
      id:1,
      home:'Internacional',
      away:'Corinthians',
      date:'2025-06-12T21:30:00',
      score:'2 x 1',
      events:[
        {type:'goal',minute:23,player:'Yasmim',team:'Internacional'},
        {type:'goal',minute:45,player:'Gabi Zanotti',team:'Corinthians'},
        {type:'yellow_card',minute:38,player:'Tamires',team:'Corinthians'},
        {type:'goal',minute:67,player:'Adriana',team:'Internacional'},
        {type:'yellow_card',minute:72,player:'Yasmim',team:'Internacional'}
      ]
    },
    {
      id:2,
      home:'Flamengo',
      away:'America-MG',
      date:'2025-06-12T19:00:00',
      score:'0 x 0',
      events:[]
    }
  ],
  sessions:[]
};
fs.writeFileSync(DATA, JSON.stringify(initial,null,2));
console.log('seed complete ->', DATA);
