import React, {FC, useEffect, useState} from 'react';
// import any = jasmine.any;
interface LoopProps  {
    children: React.ReactChildren| React.ReactNode
}
interface IWorldTime {
    datetime: string;
    day_of_week: number;
    timezone: string;
    unixtime: number;
    // map:  () => [];
}
const Loop: FC<LoopProps> = ({children}) => {
    const [ fetchData, setFetchData ] = useState('')
    let param: string = "Africa/Abidjan"
    const url: string = `http://worldtimeapi.org/api/timezone/${param}`
    useEffect(  () => {
        const delay = (ms: number) => {
            return new Promise<void>(resolve => {
                setTimeout( ()=> resolve(), ms)
            })
        }
        async function asyncTodo(){
            for(let i = 0; i< 5; i++) {
                try{
                    await delay(4000)
                    const response = await fetch(url)
                    const data:IWorldTime = await response.json()
                    let arrOfTime = `In ${data.timezone} date snd time  is ${data.datetime}   ${data.day_of_week} day of the week`
                    setFetchData(arrOfTime)
                } catch (e){
                    console.error(e)
                }
            }
        }
        asyncTodo()
    },[])
    return (
       <div>
          {fetchData}
       </div>
    );
};
export default Loop;