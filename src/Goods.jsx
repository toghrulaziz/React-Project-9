import { useEffect, useState } from "react"

function Goods() {
    let [arr, setArr] = useState([])
    let [element, setElement] = useState('')
    let [flag, setFlag] = useState(false)


    useEffect(() => {
        fetch('http://localhost:5000/goods')
            .then(res => res.json())
            .then(data => setArr(data))
    }, [])

    const addToBag = (obj) => {
        console.log(obj)
        fetch('http://localhost:5000/add-goods', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => {
                console.log(res)
                if (!res.ok) {
                    setElement(res.statusText)
                }
                return res.text()
            })
            .then(data => setElement(data))
    }

    if (arr.length === 0) {
        return <div className="download"></div>
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
                            <button onClick={() => {
                                addToBag(item)
                                setFlag(true)
                            }}>ADD</button>
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

export default Goods;