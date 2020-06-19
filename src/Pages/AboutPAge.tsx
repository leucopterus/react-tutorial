import React from 'react'
import { useHistory } from 'react-router-dom'

export const AboutPage: React.FC = () => {
  const history = useHistory()
  return (
    <React.Fragment>
      <h1>Страница информации</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis illum deserunt quia. Sunt magnam iusto ipsam dolores suscipit saepe atque?</p>
      <button className="btn"
        onClick={() => history.push('/')}>Обратно к списку дел
      </button>
    </React.Fragment>
  )
}