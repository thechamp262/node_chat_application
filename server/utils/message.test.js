let expect = require('expect');

let {generateMessage} = require('./message');
let {generateLocationMessage} = require('./message');

describe("generateMessage",()=>{
  it("Should generate correct message object",()=>{

    let from = "anthony@anthonykroberts.com";
    let text = "This is some dummy text!!";

    let m = generateMessage(from,text);

    expect(m.from).toBe(from);
    expect(m.text).toBe(text);
    expect(m.createAt).toBeA("number");
  })
})

describe('generateLocationMessage',()=>{
  it('Should generate location object',()=>{
    let from = "testCase@email.com";
    let lat = 12;
    let long = 123;
    let url = `https://www.google.com/maps?q=${lat},${long}`;

    let m = generateLocationMessage(from,lat,long);

    expect(m).toInclude({from, url});
    expect(m.createdAt).toBeA("number");

  })
})
