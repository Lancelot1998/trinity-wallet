import assign from 'lodash/assign';
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import SimpleTransactionRow from '../../components/SimpleTransactionRow';

const getProps = (overrides) =>
    assign(
        {},
        {
            time: Date.now(),
            confirmationStatus: 'pending',
            value: 100,
            unit: 'i',
            incoming: true,
            sign: '+',
            style: {
                titleColor: '#ffffff',
                defaultTextColor: { color: '#ffffff' },
            },
        },
        overrides,
    );

describe('Testing SimpleTransactionRow component', () => {
    describe('propTypes', () => {
        it('should require a time number as a prop', () => {
            expect(SimpleTransactionRow.propTypes.time).toEqual(PropTypes.number.isRequired);
        });

        it('should require a confirmationStatus string as a prop', () => {
            expect(SimpleTransactionRow.propTypes.confirmationStatus).toEqual(PropTypes.string.isRequired);
        });

        it('should require a value number as a prop', () => {
            expect(SimpleTransactionRow.propTypes.value).toEqual(PropTypes.number.isRequired);
        });

        it('should require a unit string as a prop', () => {
            expect(SimpleTransactionRow.propTypes.unit).toEqual(PropTypes.string.isRequired);
        });

        it('should require a incoming boolean as a prop', () => {
            expect(SimpleTransactionRow.propTypes.incoming).toEqual(PropTypes.bool.isRequired);
        });

        it('should require a sign string as a prop', () => {
            expect(SimpleTransactionRow.propTypes.sign).toEqual(PropTypes.string.isRequired);
        });
    });

    describe('when renders', () => {
        it('should not explode', () => {
            const props = getProps();

            const wrapper = shallow(<SimpleTransactionRow {...props} />);
            expect(wrapper.name()).toEqual('View');
        });

        it('should pass "receive" as a name prop to Icon component if "incoming" prop is true', () => {
            const props = getProps();

            const wrapper = shallow(<SimpleTransactionRow {...props} />);
            const icon = wrapper.find('Icon');

            expect(icon.props().name).toEqual('receive');
        });

        it('should pass "send" as a name prop to Icon component if "incoming" prop is false', () => {
            const props = getProps({ incoming: false });

            const wrapper = shallow(<SimpleTransactionRow {...props} />);
            const icon = wrapper.find('Icon');

            expect(icon.props().name).toEqual('send');
        });

        it('should return "confirmationStatus" prop as a direct child to second Text component', () => {
            const props = getProps();

            const wrapper = shallow(<SimpleTransactionRow {...props} />);
            const text = wrapper.find('Text').at(1);

            expect(text.children().text()).toEqual('pending');
        });

        it('should return "sign" prop as a child to third Text component', () => {
            const props = getProps();

            const wrapper = shallow(<SimpleTransactionRow {...props} />);
            const text = wrapper.find('Text').at(2);

            expect(
                text
                    .children()
                    .at(0)
                    .text(),
            ).toEqual('+');
        });

        it('should return "value" prop as a child to third Text component', () => {
            const props = getProps();

            const wrapper = shallow(<SimpleTransactionRow {...props} />);
            const text = wrapper.find('Text').at(2);

            expect(
                text
                    .children()
                    .at(2)
                    .text(),
            ).toEqual('100');
        });

        it('should return "unit" prop as a child to third Text component', () => {
            const props = getProps();

            const wrapper = shallow(<SimpleTransactionRow {...props} />);
            const text = wrapper.find('Text').at(2);

            expect(
                text
                    .children()
                    .at(3)
                    .text(),
            ).toEqual('i');
        });
    });
});