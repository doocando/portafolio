import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, {ExampleWorkBubble} from '../js/example.js';


/***antoher blog */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const myWork=[
    {
        'title': "Work Example1",
        'image': {
            'desc':"example screenshot of a project involving code",
            'src':"images/example1.png",
            'comment':""
        }
    },
    {
        'title': "Work Example2",
        'image': {
            'desc':"example screenshot of a project involving chemistry",
            'src':"images/example2.png",
            'comment':""
        }
    }
];

describe("ExampleWork component", ()=>{
    
    let component =shallow(<ExampleWork work={myWork}/>);

    it("should be a 'span' element", ()=>{
        expect(component.type()).toEqual('span');
        
    });

    it("Should contain a new childer as there are work examples",()=>{
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    });

    it("Should allow modal to open and close",()=>{
        component.instance().openModal();
        expect(component.instance().state.modalOpen).toBe(true);

        component.instance().closeModal();
        expect(component.instance().state.modalOpen).toBe(false);
    })

});

describe("ExampleWorkBubble component",()=>{
    let mockOpenModalFn = jest.fn();

    

    let component = shallow(<ExampleWorkBubble example={myWork[1]}
            openModal={mockOpenModalFn} />);

    let images = component.find("img")

    it("should contain a single img element",()=>{
        expect(images.length).toEqual(1);
    });

    it("Should have the img src set correctly",()=>{
        expect(images.getElement().props.src).toEqual(myWork[1].image.src);
    })

    it("Should call the openModal handler when clicked" ,()=>{
        component.find(".section__exampleWrapper").simulate('click');
        expect(mockOpenModalFn).toHaveBeenCalled();
    })


});