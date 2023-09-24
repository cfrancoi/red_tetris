import renderer from 'react-test-renderer';
import Link from '../Link-test';


it('change la classe lorsqu\'on le survole', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // déclenche manuellement le callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendu
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // déclenche manuellement le callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendu
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});