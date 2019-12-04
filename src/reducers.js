export default function reducer(state = {
  habits: {},
  weeklyHabitExist: false,
  dailyHabitExist: false,
  signUpError: '',
  signInError: '',
  uid: '',
}, action) {
  switch (action.type) {
    case 'ADD_NEW_HABIT':
      const newHabits = Object.assign({}, state.habits)
      let weeklyHabitExist = action.time === 'weekly' ? true : state.weeklyHabitExist;
      let dailyHabitExist = action.time === 'daily' ? true : state.dailyHabitExist;
      newHabits[action.habit] = { habit: action.habit, time: action.time, streak: 0 }
      return Object.assign({}, state, { habits: newHabits, weeklyHabitExist, dailyHabitExist });
    case 'ADD_STREAK':
      const habits = Object.assign({}, state.habits);
      habits[action.item.habit].streak++;
      return Object.assign({}, state, { habits });
    case 'SIGN_UP_ERROR':
      return Object.assign({}, state, { signUpError: action.message });
    case 'SIGN_IN_ERROR':
      return Object.assign({}, state, { signInError: action.message });
    case 'INIT_APP':
      const { weeklyHabit, dailyHabit } = Object.values(action.data.habits).reduce((acc, cur, i) => {
        if (cur.time === 'daily') {
          acc.dailyHabit = true 
        } 
        if (cur.time === 'weekly') {
          acc.weeklyHabit = true 
        } 
        return acc;
      }, { weeklyHabit: false, dailyHabit: false })
      return Object.assign({}, state, {
        habits: action.data.habits,
        uid: action.uid,
        email: action.email,
        dailyHabitExist: dailyHabit,
        weeklyHabitExist: weeklyHabit
      });
    case 'FB_SIGN_UP_SUCCESS':
      return Object.assign({}, state, { uid: action.uid, email: action.email });
    default:
      return state;
  }
}
