const expect = require('expect');
const {Users} = require('./users');

describe("Users",()=>{
  let users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Beastly',
      room: 'NJPW Fans'
    },{
      id: '2',
      name: 'Simba',
      room: 'Disney Fans'
    },{
      id: '3',
      name: 'Simba_Sucks',
      room: 'Disney Fans'
    }]
  })

  it("Should add new User",()=>{
    let users = new Users();
    let user = {id:'1234321',name:'Anthony',room:'NJPW Fans'};
    let resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  })

  it("Should return names for Disney Fans",()=>{
    let userList = users.getUserList('Disney Fans');
    expect(userList).toEqual(['Simba','Simba_Sucks']);
  })

  it("Should return names for NJPW Fans",()=>{
    let userList = users.getUserList('NJPW Fans');
    expect(userList).toEqual(['Beastly']);
  })

  it("Should find user",()=>{
    let id = users.users[0].id;
    let user = users.getUser(id);
    expect(user.id).toBe(id);
  })

  it("Should not find user",()=>{
    let id = 15;
    let user = users.getUser(id);
    expect(user).toNotExist();
  })

  it("Should remove a user",()=>{
    let id = users.users[1].id;
    let user = users.removeUser(id);

    expect(user.id).toBe(id);
    expect(users.users.length).toBe(2);
  })

  it("Should not remove a user",()=>{
    let id = '12';
    let user = users.removeUser(id);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  })
})
