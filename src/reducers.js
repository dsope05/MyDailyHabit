export default function reducer(state = {
  habits: [{
    habit: 'walk dog',
    time: 'daily'
  }, {
    habit: 'practice piano',
    time: 'weekly'
  }],
}, action) {
  console.log('action', action)
  switch (action.type) {
    case 'ADD_NEW_HABIT':
      const newHabits = Object.assign([], state.habits)
      newHabits.push({ habit: action.habit, time: action.time })
      return Object.assign({}, state, { habits: newHabits }, { other: 'wow'});
    default:
      return state;
  }
}
