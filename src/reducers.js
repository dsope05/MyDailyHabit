export default function reducer(state = {
  habits: [],
  weeklyHabitExist: true,
  dailyHabitExist: true,
  uid: '',
}, action) {
  switch (action.type) {
    case 'ADD_NEW_HABIT':
      const newHabits = Object.assign([], state.habits)
      let weeklyHabitExist = action.time === 'weekly' ? true : state.weeklyHabitExist;
      let dailyHabitExist = action.time === 'daily' ? true : state.dailyHabitExist;
      newHabits.push({ habit: action.habit, time: action.time, streak: 0 })
      return Object.assign({}, state, { habits: newHabits, weeklyHabitExist, dailyHabitExist });
    case 'ADD_STREAK':
      const habits = Object.assign([], state.habits)
      const habitIdx = habits.indexOf(action.item)
      habits[habitIdx].streak++
      return Object.assign({}, state, { habits });
    case 'INIT_APP':
      return Object.assign({}, state, {
        habits: action.data.habits,
        uid: action.uid,
        email: action.email
      });
    case 'FB_SIGN_UP_SUCCESS':
      return Object.assign({}, state, { uid: action.uid, email: action.email });
    default:
      return state;
  }
}
