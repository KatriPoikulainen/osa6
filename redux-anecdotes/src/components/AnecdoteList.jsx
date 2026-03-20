import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes((filter || '').toLowerCase()))

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

    const handleVote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}'`, 5))
  }

  
   return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default AnecdoteList