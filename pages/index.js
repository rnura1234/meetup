
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
  const client = await MongoClient.connect(
    'mongodb+srv://sanjeev:JTZozaep0y1TFiAL@cluster0.8lxmm.mongodb.net/meetups?retryWrites=true&w=majority'
  );
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
