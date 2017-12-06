
//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)
//Maybe implement lodash later
class Users{
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    let user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    //return removed user
    let u = this.getUser(id);
    if(u){
      this.users = this.users.filter((user)=>{
        return user.id !== id;
      })
      return u;
    }
  }
  getUser(id){
    let user = this.users.filter((user)=>{
      return user.id === id;
    })
    return user[0];
  }
  getUserList(room){
    let users = this.users.filter((user)=>{
      return user.room === room;
    });
    let namesArray = users.map((user)=>{
      return user.name;
    })
    return namesArray;
  }
}

module.exports = {Users};

// class Users{
//   constructor(name){
//     this.name = name;
//     console.log(name);
//   }
//   getUserDescription(){
//     return `${this.name} is 1000 years old!`
//   }
// }
//
// let me = new Users('Beastly');
// let desc = me.getUserDescription();
// console.log('this.name',me.name);
// console.log(desc);
