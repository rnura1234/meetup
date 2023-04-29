
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

import Head from 'next/head';


const HomePage = (props) => {
  // const [loadedMeetup, setLoadedMeetup] = useState([]);
  // useEffect(() => {
  //   setLoadedMeetup(dummyMeetup);
  // },[])
  return (
    <>
      <Head>
        <title>Meetup:Homepage</title>
        <meta name='description' content='Browse a huge list of highly active meetup'></meta>
      </Head>

      <MeetupList meetups={props.meetsup} />
    </>
  );
};

export async function getStaticProps() {
  const connectionUrl="mongodb+srv://sanjeev:RxlJQIR9oqHbCrfB@cluster0.vek8f.mongodb.net/?retryWrites=true&w=majority"
  const client = await MongoClient.connect(connectionUrl);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
 
 
  client.close();
  return {
    props: {
      meetsup: meetups.map(meetup=>({
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
        id:meetup._id.toString()
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
