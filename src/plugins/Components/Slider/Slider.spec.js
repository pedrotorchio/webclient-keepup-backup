import { shallowMount } from '@vue/test-utils'
import { default as CustomSlider, MAIN_COLOR_PROPERTY_NAME } from './Slider'


describe('Custom Slider', () => {
    let slider = null
    let input = null

    const   min = 1,
            max = 7,
            value = 5

    beforeEach(() => {
        slider = shallowMount(CustomSlider, {
            // sync: false,
            propsData: {
                min,
                max,
                value
            }
        })
        input = slider.find('input[type=range]')
    })
    
    it('should emit input event with numeric value when slid', () => {

        const newVal = 6
        input.setValue(newVal)

        const event = slider.emitted('input')

        expect(event).toBeTruthy()
        expect(event && event[0]).toEqual([ newVal ])

    })
    it('should pass value down from parent to element', () => {
        const newVal = 6

        slider.setProps({
            value: newVal
        })

        expect(input.element.value).toBe(`${newVal}`)
    
    })
    it('should be limited to range (min, max)', () => {

        input.setValue(0)
        expect(slider.emitted('input')[0]).toEqual([min])

        input.setValue(10)
        expect(slider.emitted('input')[1]).toEqual([max])

    })
    /**
     * VUE TEST UTILS DOESN'T SEEM TO SUPPORT CSS VARIABLES
     */
    // it('should change thumb color with prop', () => {
    //     const color = 'blue'
    //     slider.setProps({
    //         color
    //     })
    //     expect( slider.element.style.getPropertyValue( MAIN_COLOR_PROPERTY_NAME )).toBe( color )
    // })
    it('should display textual label, if it exists', () => {
        const label = "testando"
        slider.setProps({
            label
        })
        expect(slider.find('label').text()).toBe(label)
    })
    it('should not display any text label, if there is no label', () => {
        expect(slider.find('label').exists()).toBeFalsy() 
    })
})