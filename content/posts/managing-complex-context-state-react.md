---
title: Rendering and modifying complex contexts in React
date: "2021-06-20T23:04:15.125Z"
template: "post"
draft: true
slug: "react-complex-context-object"
category: "front-end"
tags:
  - "react"
  - "useReduce"
  - "useContext"
  - "nested"
description: "Updating a complex context object/state in React across deeply nested components can be tricky. We can manage this with useReduce and Context API."
---
# Motivation 
I was given an API endpoint that returned a large, complex JSON object for reading and modification, and had to spread this information across many nested React form components. 
A naive solution is just to pass the reference of the entire object from the form's top component down to all its children via the Context API. 

- For now, solution seems to be having to copy the entire object at each change.... which might not be too bad since it's a single user... 
- Can't seem to update part of the object and have than trickle down to other fields... 
- 


What do I do?
I'm so far away. 
It's seems impossible. 
It's an act of faith. 
Find your way from darkness to light. 


