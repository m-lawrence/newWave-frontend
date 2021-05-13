import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'

function ItemDetail({ removeDeleted, editListing }){
    const location = useLocation()
    const listingDetail = location.state.params
    const [toUpdate, setToUpdate] = useState(false)
    
    function handleDlt() {
        fetch(`http://localhost:3000/listings/${listingDetail.id}`, {
            method: 'DELETE'
        })
        removeDeleted(listingDetail.id)
    }
    function handleUpdate() {
        setToUpdate(toUpdate => !toUpdate)
    }


    const [editFormData, setEditFormData] = useState({
        title: listingDetail.title,
        description: listingDetail.description,
        price: listingDetail.price,
        image: listingDetail.image,
        category: listingDetail.category,
        barter: listingDetail.barter,
        for_sale: listingDetail.for_sale,
        barter_description: listingDetail.barter_description,
        location: listingDetail.location,
    })

    // need to change function names, add functions to onClicks and add state value
    function handleInfoChange(e){
        setEditFormData({...editFormData, 
            [e.target.name] : e.target.value
        })
    }

    function handleEditCategoryChange(e){
        setEditFormData({...editFormData, 
            ["category"] : e.target.value
        })
    }


    function handleEditSaleTypeChange(e){
        if (e.target.value == "for_sale"){
            setEditFormData({...editFormData, 
                ["for_sale"] : true,
                ["barter"] : false
            })}
        else if (e.target.value == "barter"){
            setEditFormData({...editFormData, 
                ["barter"] : true, 
                ["for_sale"] : false,
            })}
        else if (e.target.value == "both"){
            setEditFormData({...editFormData, 
                ["for_sale"] : true,
                ["barter"] : true
            })}
    }

    function handleEditSubmit(e){
        e.preventDefault()

        const newItem = {
            title: editFormData.title,
            description: editFormData.description,
            price: Number(editFormData.price),
            image: editFormData.image,
            category: editFormData.category,
            barter: editFormData.barter,
            for_sale: editFormData.for_sale,
            barter_description: editFormData.barter_description,
            location: editFormData.location,
            user_id:  2
        }
        
        fetch(`http://localhost:3000/listings/${listingDetail.id}`, {
            method: "PATCH",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newItem)
        })
        .then(r => r.json())
        .then(data => editListing(data))
    }

  
    return (
       <div>
           <br></br>
            <h1>{listingDetail.title}</h1>
            <img src={listingDetail.image} alt={listingDetail.title}/>
            <p>{listingDetail.description}</p>
            <p><strong>Price: </strong>${listingDetail.price}</p>
            <p><strong>Willing to trade for: </strong>{listingDetail.barter_description}</p>
            <p><strong>Located: </strong>{listingDetail.location}</p>
            <button>Message seller</button>
            <button onClick={handleUpdate}>Update Listing</button>
            <button onClick={handleDlt}>Delete Listing</button>
            {toUpdate ? <div>
                <br></br><br></br>
                {/* <form>
                    <label>Title</label>
                    <input type="text" placeholder={listingDetail.title}></input><br></br><br></br>
                    <label>Image</label>
                    <input type="text"></input><br></br><br></br>
                    <label>Description</label>
                    <input type="text"></input><br></br><br></br>
                    <label>Price</label>
                    <input type="number"></input><br></br><br></br>
                    <label>Willing to trade for: </label>
                    <input type="text"></input><br></br><br></br>
                    <label>Location</label>
                    <input type="text"></input><br></br><br></br>
                    <input type="submit"></input>
                </form> */}
                 <h2>Edit Your Listing</h2>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={handleInfoChange} value={editFormData.title} name="title" className="form-control" id="floatingInput" placeholder="Item Name"/>
                            <label for="floatingInput">Item Name</label>
                        </div>
                    <div className="form-floating mb-3">
                            <textarea className="form-control" onChange={handleInfoChange} value={editFormData.description} name="description" placeholder="Description..." id="floatingTextarea2" ></textarea>
                            <label for="floatingInput">Description</label>
                        </div>
                    <div className="form-floating mb-3">
                            <input type="text" onChange={handleInfoChange} value={editFormData.location} name="location" className="form-control" id="floatingInput" placeholder="Where are you Located?"/>
                            <label for="floatingInput">Location</label>
                        </div>
                    <div className="form-floating mb-3">
                            <input type="number" onChange={handleInfoChange} value={editFormData.price} name="price" className="form-control" id="floatingInput" placeholder="Price"/>
                            <label for="floatingInput">Price</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" onChange={handleInfoChange} value={editFormData.image} name="image" className="form-control" id="floatingInput" placeholder="Image"/>
                            <label for="floatingInput">Image</label>
                        </div>
                        {/* <div className="mb-3">
                            <label for="formFile" className="form-label">Image</label>
                            <input onChange={handleChange} value={formData.image} name="image" className="form-control" type="file" id="formFile"/>
                        </div> */}
                    <label> Select Item Category:
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={handleEditCategoryChange}>
                            <option value="strings">Strings</option>
                            <option value="percussion">Percussion</option>
                            <option value="woodwind">Woodwind</option>
                            <option value="brass">Brass</option>
                            <option value="piano">Keyboard/Piano</option>
                            <option value="misc">Other</option>
                        </select> 
                    </label>
                        <br></br>
                        <br></br>
                    <label> Sell or Trade? 
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={handleEditSaleTypeChange}>
                        <option value="barter">Trade</option>
                        <option value="for_sale">Sell</option>
                        <option value="both">Both</option>
                    </select>
                    </label>
                    <br></br>
                    <br></br>
                    <label> If You Chose Barter, What Are You Looking To Trade For?
                    <div className="form-floating mb-3">
                            <input type="text" name="barter_description" className="form-control" id="floatingInput" placeholder="Where are you Located?"/>
                            <label for="floatingInput">Guitars, Drums, etc</label>
                        </div>
                    </label>
                    <br></br>
                    <br></br>
                    <button  className="btn btn-primary" type="submit">Edit Listing</button>
                    </form >
      </div> : null}
       </div>

        

    )
}

export default ItemDetail