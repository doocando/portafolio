import React from 'react';
import ReactDom from 'react-dom';
import ExampleWork from './example';

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
    },
    {
        'title': "Work Example3",
        'image': {
            'desc':"example screenshot of a project involving cats",
            'src':"images/example3.png",
            'comment':`“Bengal cat” by roberto shabs is licensed under CC BY 2.0
                        https://www.flickr.com/photos/37287295@N00/2540855181`
        }
    }        
]

ReactDom.render(<ExampleWork work={myWork}/>, document.getElementById('example-work'));