import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import * as Job from "./styles"
import { useAuth } from '../../contexts/auth';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary, brandSecondary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Avatar, Badge, Icon, withBadge, Card, ListItem, Divider } from 'react-native-elements'


interface job {
    occupation: string;
    start_work_time: string;
    end_work_time: string;
    period: string;
    company: string;
}
interface IJob {
    id: string;
    user_id: string;
    occupation: string;
    start_work_time: string;
    end_work_time: string;
    period: string;
    company: string;
    created_at: string;
}
const JobUser: React.FC = ({ navigation }: any) => {
    const [userJob, setUserJob] = React.useState<IJob[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getUserJobAsync() {
        const response = await api.get(`/job_user/user/${user?.id}`, { headers: { Authorization } })

        const jobUser = (response.data as IJob[]).map((item: {
            id: string;
            user_id: string;
            occupation: string;
            start_work_time: string;
            end_work_time: string;
            period: string;
            company: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                occupation: item.occupation,
                start_work_time: item.start_work_time,
                end_work_time: item.end_work_time,
                period: item.period,
                company: item.company,
                created_at: item.created_at
            }
        })
        setUserJob(jobUser)
    }
    React.useEffect(() => {
        getUserJobAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getUserJobAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Job</Text>

            {!userJob.length && <>
                <Text>No information was filled</Text>
                <Job.StyledBotton onPress={() => navigation.navigate('CreateUserJob')}>
                    <Job.BottonText>
                        Click to fill information
                    </Job.BottonText>
                </Job.StyledBotton>
            </>}
            {userJob &&
                userJob.map((item, key) => (
                    <Card key={item.id}>

                        <Text>What is your ocupation?</Text>
                        <Text style={styles.badgeStyleText}>{item?.occupation.toUpperCase()}</Text>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Text>At what time you go to work?</Text>
                        <Text style={styles.badgeStyleText}>{item?.start_work_time.toUpperCase()}</Text>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Text>At what time you finish work?</Text>
                        <Text style={styles.badgeStyleText}>{item?.end_work_time.toUpperCase()}</Text>

                        <Divider style={{ backgroundColor: brandPrimary }} />

                        <Text>Which period you work?</Text>
                        <Text style={styles.badgeStyleText}>{item?.period}</Text>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Text>Company Name?</Text>
                        <Text style={styles.badgeStyleText}>{item?.company}</Text>

                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Job.StyledBotton onPress={() => navigation.navigate('UpdateUserJob')}>
                            <Job.BottonText>
                                Update all information
                            </Job.BottonText>
                        </Job.StyledBotton>
                    </Card>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    pickerSelectStyle: {
        backgroundColor: secondary,
        Padding: 10,
        paddingLeft: 50,
        paddingRight: 5,
        borderRadius: 5,
        fontSize: 16,
        height: 49,
        marginVertical: 30,
        marginBottom: 1,
        color: primary
    },
    pickerLabelStyle: {
        color: brandPrimary,
        fontSize: 13,
        textAlign: 'left',
        marginBottom: -25
    },
    badgeStyleText: {
        fontSize: 13,
        Padding: 20,
        color: brandPrimary,
        marginBottom: 10
    },
    /* content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }, */
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginBottom: 20

    },
    columnSize: {
        width: 170,
    },
    marginRight: {
        marginRight: 10
    },
})
export default JobUser 