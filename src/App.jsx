import { React, useState } from 'react'
import arrow from '../assets/icon-arrow.svg'
import './Style.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

function App() {
  let [date, setDate] = useState('')
  let [month, setMonth] = useState('')
  let [year, setYear] = useState('')

  const today = new Date();
  const curday = today.getDate()
  const schema = yup.object().shape({
    date: yup.number().required('Date is Required*').min(1, 'Enter the Valid Birth Date in Numberical*').max(31, 'Maximum Date is 31*'),
    month: yup.number().required('Month is requires*').min(1, "Enter Your Valid Birth Month in Numberical*").max(12, 'Maximum Month is 12*'),
    year: yup.number().required('Year is requires*').min(1, 'Enter Your Valid Birth Year in NUmberical*')
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm(
    {
      resolver: yupResolver(schema),
      mode: 'onChange'
    },
  ) 


  return (
    <>
      <form onSubmit={handleSubmit((data) => {
        reset()
        if (data.month > today.getMonth()){
          setYear(Math.abs(today.getFullYear() - data.year)-1)
          setMonth((today.getMonth() - data.month)+12)
        }
        if(data.date > today.getDate()){
          const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
          setDate(date += prevMonth.getDate())
        }
        else{
          setYear(Math.abs(today.getFullYear() - data.year))
          setMonth(Math.abs(today.getMonth()-data.month))
          setDate(Math.abs(today.getDate()-date.data))
        }
      })}>
        <div className="input-container">
          <div className="input-boxs">
            {errors?.day && <div className='error'>{errors.day.message}</div>}
            <label htmlFor="day">DAY</label>
            <input type="text" name="day" id="day" {...register('date')} placeholder="DD" />
          </div>
          <div className="input-boxs">
            {errors?.month && <div className='error'>{errors.month.message}</div>}
            <label htmlFor="month">MONTH</label>
            <input type="text" name="month" id="month" {...register('month')} placeholder="MM" />
          </div>
          <div className="input-boxs">
            {errors?.year && <div className='error'>{errors.year.message}</div>}
            <label htmlFor="year">YEAR</label>
            <input type="text" name="year" id="year" {...register('year')} placeholder="YYYY" />
          </div>
        </div>
        <div className="btn-container">
          <div className="line"></div>
          <button className="btn">
            <img src={arrow} alt="" />
          </button>
        </div>
      </form>
      <div className="result-container">
        <p><span className='age'>{year === '' ? '- -': year}</span> years</p>
        <p><span className='age'>{month === '' ? '- -': month}</span> months</p>
        <p><span className='age'>{date === '' ? '- -': date}</span> days</p>
      </div>
    </>
  )
}

export default App
