---
title: Using forms to filter data using React 
date: "2021-06-06T23:04:15.125Z"
template: "post"
draft: true
slug: "react-filter-data-tree"
category: "front-end"
tags:
  - "react"
  - "filter"
  - "tree"
description: "While working on a data visualization component in my React dashboard (ie. charts), I had to build a form that extracted the correct dataset from a large JSON object. I built a component that treats the object as a large n-ary tree and filters down the branches until returning the correct leaf (dataset)"
---
# Motivation
I had to modify a complex object across deeply nested React components, and I wanted to do it with the useReduce and useContext hooks as it seemed cleaner and more maintainable than having to learn and write the boilerplate code for Redux. 

# Description 
Essentially, I had to read and update a large JSON object which had in it many deep layers with arrays mixed in. I wrote a nested React form that could represent and update this. This included changing the size of some arrays within the the object, as well as updating objects nested _within_ those arrays. 

# Solution
Passing the state of the object (and any updates that occur to the object being propogated down to all children components) was fairly trivial, by using the createContext/useContext hook. You can find a guide to using that here: -link to context hooks here-.

Updating the object is done through a reducer function, which is where the majority of the complexity arises.  

