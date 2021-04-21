// deno-lint-ignore-file

/* database */

db = new Mongo().getDB('admin')

db.createUser({
  user: 'adminuser',
  pwd: 'adminpass',
  roles: [{
    role: 'clusterAdmin',
    db: 'admin',
  }]
})

db.auth('adminuser', 'adminpass')

dbdev = db.getSiblingDB('dbdev')

dbdev.createUser({
  user: 'dbuser',
  pwd: 'dbpass',
  roles: [{
    role: 'dbOwner',
    db: 'dbdev',
  }],
})
