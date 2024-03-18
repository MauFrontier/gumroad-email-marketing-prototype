export const exampleProducts = `
[
  {
    key: 'brush-pack-1',
    name: 'Brush pack 1',
  },
  {
    key: 'christmas-bundle',
    name: 'Christmas bundle',
  },
  {
    key: 'illustration-tutorial',
    name: 'Illustration Tutorial',
  },
  {
    key: 'pro-video-course',
    name: 'Pro video course',
  },
  {
    key: 'tutorial-painting-101',
    name: 'Tutorial: Painting 101',
  },
  {
    key: 'premiere-pro-templates',
    name: 'Premiere Pro templates',
  },
  {
    key: 'skateboarding-course',
    name: 'Skateboarding course',
  },
  {
    key: 'tutorial-2024',
    name: 'Tutorial 2024',
  },
  {
    key: 'brush-pack-2024',
    name: 'Brush pack 2024',
  },
  {
    key: 'lut-pack-2023',
    name: 'LUT pack 2023',
  },
]`;

export const examples = `
* Prompt: People who know how to knit while they're in the office.

{
  "result": "failure",
  "payload": {
    "filterGroups": []
  },
  "errors": [
    "Please describe your targeted audience."
  ]
}

* Prompt: Bought in 2019

{
  "result": "success",
  "payload": {
    "filterGroups": [
      {
        "id": "87f6e7ee-ecec-403c-b410-5d6b58ded299",
        "filters": [
          {
            "id": "304b5104-4622-4914-a33a-21f37304e6b1",
            "subject": "Date",
            "subjectQualifier": "Purchased",
            "verb": "Is after",
            "value": "2018-12-31"
          },
          {
            "id": "c739a470-027a-4cc2-92d1-e8272c45e891",
            "operand": "And",
            "subject": "Date",
            "subjectQualifier": "Purchased",
            "verb": "Is before",
            "value": "2020-01-01"
          },
        ]
      },
    ]
  },
  "errors": []
}

* Prompt: purchased between jan 1st and jan 25th, but did not purchase on jan 10th
  
  {
    "result": "success",
    "payload": {
      "filterGroups": [
        {
          "id": "87f6e7ee-ecec-403c-b410-5d6b58ded299",
          "filters": [
            {
              "id": "304b5104-4622-4914-a33a-21f37304e6b1",
              "subject": "Date",
              "subjectQualifier": "Purchased",
              "verb": "Is after",
              "value": "2023-12-31"
            },
            {
              "id": "c739a470-027a-4cc2-92d1-e8272c45e891",
              "operand": "And",
              "subject": "Date",
              "subjectQualifier": "Purchased",
              "verb": "Is before",
              "value": "2024-01-26"
            },
            {
              "id": "c739a470-027a-4cc2-92d1-e8272c45e891",
              "operand": "And",
              "subject": "Date",
              "subjectQualifier": "Purchased",
              "verb": "Is not",
              "value": "2024-01-10"
            },
          ]
        },
      ]
    },
    "errors": []
  }

* Prompt: People who made a purchase during or after 2019, who bought the skateboarding course and Premiere Pro templates. They must not have bought the Christmas bundle or the new tutorial. I also want those who have bought a motorcycle or an app. The other group that should receive this are people who are located in Canada and have paid more than $99.

{
  "result": "success with errors",
  "payload": {
    "filterGroups": [
      {
        "id": "812454b5-64f8-4658-8e9f-6c33346eb2e4",
        "filters": [
          {
            "id": "5f12d685-8d9a-45b3-bfd0-5943ac5c4cf2",
            "subject": "Date",
            "subjectQualifier": "Purchased",
            "verb": "Is after",
            "value": "2018-12-31"
          },
          {
            "id": "b1a3250e-4277-470f-b2ff-352a759a05a0",
            "operand": "And",
            "subject": "Product",
            "verb": "Has bought",
            "verbQualifier": "All",
            "value": [
              "Skateboarding course",
              "Premiere Pro templates"
            ]
          },
          {
            "id": "fb478e76-390f-44f4-abdc-891139e79d8c",
            "operand": "And",
            "subject": "Product",
            "verb": "Has not yet bought",
            "verbQualifier": "Any",
            "value": [
              "Christmas bundle",
              "New tutorial"
            ]
          }
        ]
      },
      {
        "id": "dba702ee-8171-43ec-a012-4ff10e2c9d54",
        "operand": "Or",
        "filters": [
          {
            "id": "f48ba624-3541-4e9c-b2c3-f7ae7c53a046",
            "subject": "Location",
            "verb": "Is",
            "value": "CA"
          },
          {
            "id": "5605d421-b669-495f-a560-a1ec497eac76",
            "operand": "And",
            "subject": "Payment",
            "verb": "Is more than",
            "value": "99"
          },
        ]
      }
    ]
  },
  "errors": [
    "Products 'motorcycle' and 'app' were not recognized. They've been excluded from your criteria."
  ]
}

* Prompt: People who not yet bought any of my products, or people who have bought all of my products.

{
  "result": "success",
  "payload": {
    "filterGroups": [
      {
        "id": "812454b5-64f8-4658-8e9f-6c33346eb2e4",
        "filters": [
          {
            "id": "b1a3250e-4277-470f-b2ff-352a759a05a0",
            "subject": "Product",
            "verb": "Has not yet bought",
            "verbQualifier": "Any",
            "value": [
              "brush-pack-1",
              "christmas-bundle",
              "illustration-tutorial",
              "pro-video-course",
              "tutorial-painting-101",
              "premiere-pro-templates",
              "skateboarding-course",
              "tutorial-2024",
              "brush-pack-2024",
              "lut-pack-2023"
            ]
          },
          {
            "id": "b1a3250e-4277-470f-b2ff-352a759a05a0",
            "operand": "Or",
            "subject": "Product",
            "verb": "Has bought",
            "verbQualifier": "All",
            "value": [
              "brush-pack-1",
              "christmas-bundle",
              "illustration-tutorial",
              "pro-video-course",
              "tutorial-painting-101",
              "premiere-pro-templates",
              "skateboarding-course",
              "tutorial-2024",
              "brush-pack-2024",
              "lut-pack-2023"
            ]
          }
        ]
      }
    ]
  },
  "errors": []
}


* Prompt: People who joined in the last 45 days.

{
  "result": "success",
  "payload": {
    "filterGroups": [
      {
        "id": "6fbebc9e-4cea-406d-9503-d73a8fd8474f",
        "filters": [
          {
            "id": "6fbebc9e-4cea-406d-9503-d73a8fd8474f",
            "subject": "Date",
            "subjectQualifier": "Joined",
            "verb": "Is in the last",
            "value": "45"
          }
        ]
      }
    ]
  },
  "errors": []
}
`;
