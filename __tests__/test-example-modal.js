import React from 'react';
import { shallow } from 'enzyme';
import ExampleWorkModal from '../js/example-work-modal.js';


/***antoher blog */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const myExample=
    {
        'title': "Work Example1",
        'href': "http://example.com",
        'desc': "Lorem ipsiu dolor",
        'image': {
            'desc':"example screenshot of a project involving code",
            'src':"images/example1.png",
            'comment':""
        }
    };

describe("Example work modal component", ()=>{
    let component = shallow(<ExampleWorkModal  example={myExample}
        open={false}/>);
    let openComponent = shallow(<ExampleWorkModal  example={myExample}
        open={true}/>);        

    let anchors = component.find("a");

    it("Should contain a single 'a' element", ()=>{
        expect(anchors.length).toEqual(1);
    });

    it("Should link to our project", ()=>{
        expect(anchors.getElement().props.href).toEqual(myExample.href);
    });

    it("Should have the modal set correctly",()=>{
        
        component.find("background--skyBlue").forEach((node, index) => {
            expect(node.hasClass("modal--closed")).to.equal(true);
          });
        
          component.find("background--skyBlue").forEach((node, index) => {
            expect(node.hasClass("modal--open")).to.equal(true);
          });
       
    })
})
