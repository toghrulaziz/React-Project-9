import { useEffect, useState } from "react"


function MyBag() {
    let [arr, setArr] = useState([])
    let [flag, setFlag] = useState(false)
    let [element, setElement] = useState('')

    const getData = () => {
        fetch('http://localhost:5000/my-bag')
            .then(res => res.json())
            .then(data => setArr(data))
    }

    useEffect(() => {
        getData()
    }, [flag])


    if (arr.length === 0) {
        return <div className="download"></div>
    }
    

    const deleteFromBag = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/delete-mybag/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                console.log(res)
                if (!res.ok) {
                    console.log(res.statusText)
                }
                return res.text()
            })
            .then(data => setElement(data))
        setFlag(!flag)
        getData()
    }

    console.log(arr)
    return (
        <div className="App">
            <ul>
                {arr.map((item) => {
                    return (
                        <li>
                            <p>{item.product_name}</p>
                            <p>{item.product_description}</p>
                            <p>{item.product_price}</p>
                            <button onClick={() => deleteFromBag(item.id)}>DELETE</button>
                        </li>
                    )
                })}
            </ul>

            {flag && <div className='editWindow'>
                <div >
                    <p>{element}</p>
                    <button onClick={() => {
                        setFlag(!flag)
                    }}>EXIT</button>
                </div>
            </div>}

        </div>
    );
}

export default MyBag;