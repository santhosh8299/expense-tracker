import { TestBed } from "@angular/core/testing"
import { UtilityService } from "./utility.service"

describe('utility service', () => {
    let utilityService: UtilityService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UtilityService]
        });
        utilityService = TestBed.inject(UtilityService);
        utilityService.date = new Date('4/8/2024')
    })
    it('return current month',()=>{
        expect(utilityService.getCurrentMonth()).toBe('April')
    })
    it('return all mondays in current month',()=>{
        expect(utilityService.getMondays()).toEqual([1, 8, 15, 22, 29])
    })
})