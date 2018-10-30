// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import Textbox from 'components/textbox/textbox.js';

describe('components/TextBox', () => {
    test('should match snapshot with required props', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function

        const wrapper = shallow(
            <Textbox
                id='someid'
                value='some test text'
                onChange={emptyFunction}
                onKeyPress={emptyFunction}
                characterLimit={4000}
                createMessage='placeholder text'
                supportsCommands={false}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('should throw error when value is too long', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function

        // this mock function should be called when the textbox value is too long
        var gotError = false;
        function handlePostError(msg) {
            gotError = msg !== null;
        }

        const wrapper = shallow(
            <Textbox
                id='someid'
                value='some test text that exceeds char limit'
                onChange={emptyFunction}
                onKeyPress={emptyFunction}
                characterLimit={14}
                createMessage='placeholder text'
                supportsCommands={false}
                handlePostError={handlePostError}
            />
        );

        expect(gotError).toEqual(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('should throw error when new property is too long', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function

        // this mock function should be called when the textbox value is too long
        var gotError = false;
        function handlePostError(msg) {
            gotError = msg !== null;
        }

        const wrapper = shallow(
            <Textbox
                id='someid'
                value='some test text'
                onChange={emptyFunction}
                onKeyPress={emptyFunction}
                characterLimit={14}
                createMessage='placeholder text'
                supportsCommands={false}
                handlePostError={handlePostError}
            />
        );

        wrapper.setProps({value: 'some test text that exceeds char limit'});
        wrapper.update();
        expect(gotError).toEqual(true);

        expect(wrapper).toMatchSnapshot();
    });
});
