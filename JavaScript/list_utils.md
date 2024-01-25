#### Slicing and reversing a list (lodash)
```
    const winners = _.take(list, SLICE_QTY);
    const losers = _.reverse(_.takeRight(list, SLICE_QTY));
    // _.take() to get items from begining
    // _.takeRight() to get items from end
    // _.reverse() to reverse a list
```