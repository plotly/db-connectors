import React from 'react';
import ReactDOM from 'react-dom';
import ConnectionDialog from './ConnectionDialog';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe( 'Query Component', ()=>{

    beforeAll(()=>{
        configure({ adapter: new Adapter() });
    });
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ConnectionDialog  />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

})