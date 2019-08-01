export default function reducer(state = {
  habits: [{
    habit: 'walk dog',
    time: 'daily',
    streak: 0
  }, {
    habit: 'practice piano',
    time: 'weekly',
    streak: 0
  }],
  weeklyHabitExist: true,
  dailyHabitExist: true
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
    default:
      return state;
  }
}
