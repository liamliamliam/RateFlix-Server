export const dateCreatedTotals = (unit, amount) => {
  return [
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: [
                {
                  $month: '$dateCreated'
                },
                {
                  $month: {
                    $dateAdd: {
                      startDate: new Date(),
                      unit: unit,
                      amount: amount
                    }
                  }
                }
              ]
            },
            {
              $eq: [
                {
                  $year: '$dateCreated'
                },
                {
                  $year: {
                    $dateAdd: {
                      startDate: new Date(),
                      unit: unit,
                      amount: amount
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    },
    {
      $project: {
        day: { $dayOfMonth: '$dateCreated' },
        month: { $month: '$dateCreated' },
        year: { $year: '$dateCreated' },
        dc: {
          $dateToString: {
            date: '$dateCreated',
            format: '%Y-%m-%d'
          }
        }
      }
    },
    {
      $group: {
        _id: { dc: '$dc' },
        total: { $sum: 1 }
      }
    }
  ];
};
