const expect = require('expect');
const {isRealString} = require('./validation');

describe("isRealString",()=>{
  it("Should reject non-string values",()=>{
    let sent = 1234;
    let validation = isRealString(sent);
    expect(validation).toBe(false);
  })
  it("Should reject string with only spaces",()=>{
    let sent = "    ";
    let validation = isRealString(sent);
    expect(validation).toBe(false);
  })
  it("Should all strins with non-space characters",()=>{
    let sent = "Anthony  ";
    let validation = isRealString(sent);
    expect(validation).toBe(true);
  })
})
