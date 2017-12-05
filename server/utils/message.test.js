let expect = require('expect');

let {generateMessage} = require('./message');

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
