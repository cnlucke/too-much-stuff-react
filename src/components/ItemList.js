import React from 'react';
import Item from './Item'


const divStyle1 = () => {
  return (
  {left: Math.floor(Math.random() * 501),
  top: Math.floor(Math.random() * 376)}
)
}

const divStyle2 = () => {
  return (
    {left: Math.floor(Math.random() * 251),
    top: Math.floor(Math.random() * 201)}
  )
}

const getCoordinates = (id) => {
  return (id === "location-1" ? divStyle1() : divStyle2())
}

const ItemList = (props) => {
  const { className, id } = props
  const imgs = (props.list) ?
    props.list.map((img) => {
      return (
        <Item className={className}
              coordinates={getCoordinates(id)}
              img={img}
              key={img.id}
              handleClick={props.handleClick}/>
      )
    })
  : null

  return (
    imgs
  )
}

export default ItemList;
