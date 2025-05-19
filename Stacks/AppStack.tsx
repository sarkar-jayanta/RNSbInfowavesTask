import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {AppStackParams} from '../Constants/AppStackParams';
import HomeScreen from '../Screens/HomeScreen'

// Navigator instance with proper param list typing
const Stack = createStackNavigator<AppStackParams>();

// Default screen options
const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

// Centralized screen config array
const appScreens: Array<{
  name: keyof AppStackParams;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
}> = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {headerShown: false},
  },
];

// AppStack component
const AppStack = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={defaultScreenOptions}>
    {appScreens.map(({name, component, options}) => (
      <Stack.Screen
        key={name}
        name={name}
        component={component}
        options={options}
      />
    ))}
  </Stack.Navigator>
);

export default AppStack;
