# The Daily Axess

[The Daily Axess](https://axess-news.vercel.app/) - Live published website hosting this page application

The Daily Axess is a NextJS web application that brings the latest articles to users.

# Features!

- Store a queue of up to the 5 latest articles you have selected. Simply select and store them in queue to view later on.

You can also:

- Search articles for certain topics
- Get a more detailed description of an article by selecting one from your queue

### Challenges

**TypeScript** - This is the first time I used TypeScript. One of the challenges I had while creating this application was understanding how to use TypeScript taking advantage of setting interfaces and assigning a type to my components and variables while keeping my code organized. I eventually utilized its features to help destructure the API responses, assign types of my variables and functions, and properly define the parameters passed into the components.

**Creating a Queue List** - One of the challenges I faced when creating the queue was storing the last 5 articles added to the queue in a list because the article component was a grandchild of the index.tsx file. To solve this, I created a function in the index.tsx file that handles for adding to the queue and default images list with the necessary inputs and sent this down as a parameter to the article component. When the article was selected, I called that function with the correct inputs and it backpropogated upwards through the parent components to call that function in the index.tsx file where those articles were then appended to the list.

**Displaying Article Selected from the Queue** - I used a similar concept for creating a queue list to handle for showing the selected article from the queue. I created a function that took an article response object as an input and passed that down to the HistoryQueue component so that when that article is clicked on in the queue, it backpropogates and calls that function in the parent Queue component to update the variables displaying the article information.

**Styling the Queue Component** - I wanted to display the selected article in a way such that the image for the article, whether it is from the url or a default one, would be in the background with the list of the queued articles and article information on top of that. To do this, I used the **position : relative** and **position : absolute** along with the **top/right/bottom/left** stylings to place the components in the right place. This let me place the image in a way that it looked like it was in the background while the information was on top positioned across the image.

**Handling Image Errors** - I found that some of the URL's for the urlToImage property of the articles returned errors. To handle for this, I downloaded default images for each of the categories and called them if there was an error thrown by the URL. I also created a list for the default images similar to the one for the queued articles. This allowed the default images to move around the application with their respective articles. This way, if the URL fails to load in a certain component, the default image will be there.
[Utilized this in Article.tsx and Queue.tsx]

### Tech Stack

The Daily Axess uses a number of open frameworks/languages to work properly:

- [NextJS]
- [TypeScript]
- [NewsAPI]
- [SCSS]

And of course The Daily Axess itself is open source with a [public repository][https://github.com/sahilkamboj3/axess_news] on GitHub.
