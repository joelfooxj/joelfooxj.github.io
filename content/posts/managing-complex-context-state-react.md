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
description: "Updating a complex context object/state in React across deeply nested components via the useReduce hook can be tricky, here's how I managed it."
---
# Motivation 
I needed to build a React component that was basically a list of selection fields, each one filtering a large nested object that was essentially a balanced n-ary tree, with nodes in the tree representing top level keys, and ending in leafs that was the array of data that I needed to drill down the tree to extract. 

Selecting an option from a selection field would then populate the next selection field with keys from the parent option. This is done until the user has drilled down the nodes in the tree, and thus reached the leaf where an array of data (in this case, data for constructing some charts) was extracted. 

-> add tree pic here

For example, from the picture above, the selection field 1 would provide the nodes at layer 1 of the object tree. When the user selects node 3, selection field 2 will now provide the children of node 3 as options (of layer 2 of the tree). 
# Solution 
At its core, the tools that we need are recursive, as per the n-ary tree structure requires, with some added complexity when dealing with React states. Below is the code for the React component. 

-> Code for filter data component. 

First, we want to know the height of the tree, up to the node before the leaf layer. It is important to note that we have to make the assumption that the tree is balanced, ie. the height of the tree remains the same whichever branch you choose to travel down on. This is because each selection field for the user represents a layer of the tree. 

To find the height of the tree, we use the function -insert function name here- which recursively travels down and counts each node until it finds the leaf (an array of data). If not already explicitly specified, this also tells us how many selection fields there are. 

Now, because this is user facing, we require each field to be labelled, and we can either pass those in ahead of time (in which case, the number of labels must correspond to the number of selection fields), or we can embed that into the JSON object itself and pick it up as we build out the fields. 

I'm almost certain that there's an optimum solution out there for filtering data that's structured like this JSON object, I just haven't found it yet. I will probably revisit this solution sometime in the future when I get around to refactoring the codebase.



/*
-  Should I modify to account for unbalanced tree?o
- Refactor component to dynamically create selection fields as options are being selected.
- Would probably solve the depoping of fields.

 */
