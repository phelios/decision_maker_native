import {StyleSheet} from 'react-native';

export const flexStyle = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
  },
  button: {
    margin: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'capitalize',
  },
});

export const mainStyle = StyleSheet.create({
  container: {
    padding: 10,
  },
});
