import { add } from "./testFuction"

describe('test function', ()=>{
    it('adds two numbers', ()=>{
        expect(add(1,2)).toBe(3);
    })
})