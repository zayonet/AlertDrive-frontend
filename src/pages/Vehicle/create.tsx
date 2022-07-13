import * as React from 'react';
import { View, Text, ActivityIndicator, TextInput, StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";
import * as VehiclesT from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker'
//icons
import { Octicons } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { secondary, brandPrimary, primary, tertiary } = theme.light.colors;
import { showMessage } from "react-native-flash-message";

//api server 
import api from '../../service/api';
import ICars from '../../interface/cars'
import { SearchBar } from 'react-native-screens';

interface vehicle {
    brand: string;
    model: string;
    registration_number: string;
    registration_country: string;
    engine_cc: string;
    year: string;
    fuel: string;
    horse_power: string;
}
interface IVehicle {
    id: string;
    brand: string;
    model: string;
    registration_number: string;
    registration_country: string;
    engine_cc: string;
    year: string;
    fuel: string;
    horse_power: string;
    created_at: string;
}
const yesOrNo = [
    { name: "", id: 1 },
    { name: "Yes", id: 2 },
    { name: "No", id: 3 }
];

const CreateVehicle: React.FC = ({ navigation }: any) => {
    const { signOut, user, token } = useAuth();
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const [cars, setCars] = React.useState<ICars[]>([]);
    const Authorization = `${token}`;

    async function getCarsAsync() {
        const response = await api.get(`/car`)

        const carsUser = (response.data as ICars[]).map((item: ICars) => {
            return {
                id_trim: item.id_trim,
                model: item.model,
                make: item.make,
                generation: item.generation,
                year_from: item.year_from,
                year_to: item.year_to,
                series: item.series,
                trim: item.trim,
                body_type: item.body_type,
                load_height_mm: item.load_height_mm,
                number_of_seats: item.number_of_seats,
                length_mm: item.length_mm,
                width_mm: item.width_mm,
                height_mm: item.height_mm,
                wheelbase_mm: item.wheelbase_mm,
                front_track_mm: item.front_track_mm,
                rear_track_mm: item.rear_track_mm,
                curb_weight_kg: item.curb_weight_kg,
                wheel_size_r14: item.wheel_size_r14,
                ground_clearance_mm: item.ground_clearance_mm,
                trailer_load_with_brakes_kg: item.trailer_load_with_brakes_kg,
                payload_kg: item.payload_kg,
                back_track_width_mm: item.back_track_width_mm,
                front_track_width_mm: item.front_track_width_mm,
                clearance_mm: item.clearance_mm,
                full_weight_kg: item.full_weight_kg,
                front_rear_axle_load_kg: item.front_rear_axle_load_kg,
                max_trunk_capacity_l: item.max_trunk_capacity_l,
                cargo_compartment_length_width_height_mm: item.cargo_compartment_length_width_height_mm,
                cargo_volume_m3: item.cargo_volume_m3,
                minimum_trunk_capacity_l: item.minimum_trunk_capacity_l,
                maximum_torque_n_m: item.maximum_torque_n_m,
                injection_type: item.injection_type,
                overhead_camshaft: item.overhead_camshaft,
                cylinder_layout: item.cylinder_layout,
                number_of_cylinders: item.number_of_cylinders,
                compression_ratio: item.compression_ratio,
                engine_type: item.engine_type,
                valves_per_cylinder: item.valves_per_cylinder,
                boost_type: item.boost_type,
                cylinder_bore_mm: item.cylinder_bore_mm,
                stroke_cycle_mm: item.stroke_cycle_mm,
                engine_placement: item.engine_placement,
                cylinder_bore_and_stroke_cycle_mm: item.cylinder_bore_and_stroke_cycle_mm,
                turnover_of_maximum_torque_rpm: item.turnover_of_maximum_torque_rpm,
                max_power_kw: item.max_power_kw,
                presence_of_intercooler: item.presence_of_intercooler,
                capacity_cm3: item.capacity_cm3,
                engine_hp: item.engine_hp,
                engine_hp_rpm: item.engine_hp_rpm,
                drive_wheels: item.drive_wheels,
                bore_stroke_ratio: item.bore_stroke_ratio,
                number_of_gears: item.number_of_gears,
                turning_circle_m: item.turning_circle_m,
                transmission: item.transmission,
                mixed_fuel_consumption_per_100_km_l: item.mixed_fuel_consumption_per_100_km_l,
                range_km: item.range_km,
                emission_standards: item.emission_standards,
                fuel_tank_capacity_l: item.fuel_tank_capacity_l,
                acceleration_0_100_km_h_s: item.acceleration_0_100_km_h_s,
                max_speed_km_per_h: item.max_speed_km_per_h,
                city_fuel_per_100km_l: item.city_fuel_per_100km_l,
                CO2_emissions_g_km: item.CO2_emissions_g_km,
                fuel_grade: item.fuel_grade,
                highway_fuel_per_100km_l: item.highway_fuel_per_100km_l,
                back_suspension: item.back_suspension,
                rear_brakes: item.rear_brakes,
                front_brakes: item.front_brakes,
                front_suspension: item.front_suspension,
                steering_type: item.steering_type,
                car_class: item.car_class,
                country_of_origin: item.country_of_origin,
                number_of_doors: item.number_of_doors,
                safety_assessment: item.safety_assessment,
                rating_name: item.rating_name,
                battery_capacity_KW_per_h: item.battery_capacity_KW_per_h,
                electric_range_km: item.electric_range_km,
                charging_time_h: item.charging_time_h
            }
        })
        setCars(carsUser)
    }
    React.useEffect(() => {
        getCarsAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getCarsAsync();

        });
        return updateNavigation;
    }, [])
    async function handleVehicle(credentials: vehicle, setSubmitting: any) {
        //handleMessage(null);
        console.log(credentials);
        const response = await api.post('/vehicle', credentials)
            .then((response) => {
                const result = response.data;
                if (result) {
                    navigation.navigate('Vehicle');
                }
                setSubmitting(false);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
                navigation.navigate('Vehicle');
            })
            .catch(error => {
                console.log(error)
                setSubmitting(false);
                handleMessage("An error ocurred. Check your network and try again! Try tp login again");
                showMessage({
                    message: "Oops!",
                    description: "Ocorreu algum erro durante o registo de dados",
                    type: "danger",
                });
            })

    }

    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }







    const [search, setSearch] = React.useState('');
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);
    const [masterDataSource, setMasterDataSource] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3333/api/v1/car')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.model
                    ? item.model.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <Text onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.title.toUpperCase()}
            </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };
    return (
        <SafeAreaView style={{ marginTop: 25 }}>
            <ScrollView>
                <View style={styles.container}>
                    <SearchBar
                        round
                        searchIcon={{ size: 24 }}
                        onChangeText={(text) => searchFilterFunction(text)}
                        onClear={(text) => searchFilterFunction('')}
                        placeholder="Type Here..."
                        value={search}
                    />
                    <FlatList
                        data={filteredDataSource}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={ItemView}
                    />
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Formik
                        initialValues={{
                            user_id: user?.id,
                            brand: "",
                            model: "",
                            registration_number: "",
                            registration_country: "",
                            engine_cc: "",
                            year: "",
                            fuel: "",
                            horse_power: ""
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values }
                            if (
                                values.brand == '' ||
                                values.model == '' ||
                                values.registration_number == '') {
                                handleMessage('Please, fill all the fields');
                                setSubmitting(false);
                            } else {
                                handleVehicle(values, setSubmitting)
                            }
                            //console.log(values); navigation.navigate('home')
                        }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                        (<VehiclesT.StyledFormArea>

                            <MyTextInput
                                label="Car Brand"
                                icon="dot-fill"
                                placeholder="Alfa Romeo"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('brand')}
                                onBlur={handleBlur('brand')}
                                value={values.brand} />

                            <MyTextInput
                                label="Car Model"
                                icon="dot"
                                placeholder="105/115"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('model')}
                                onBlur={handleBlur('model')}
                                value={values.model} />

                            <MyTextInput
                                label="Car Registration Number"
                                icon="checklist"
                                placeholder="12-25-IP"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('registration_number')}
                                onBlur={handleBlur('registration_number')}
                                value={values.registration_number} />

                            <MyTextInput
                                label="Car Registration Country"
                                icon="globe"
                                placeholder="UFC"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('registration_country')}
                                onBlur={handleBlur('registration_country')}
                                value={values.registration_country} />

                            <MyTextInput
                                label="Car Engine"
                                icon="meter"
                                placeholder="UFC"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('engine_cc')}
                                onBlur={handleBlur('engine_cc')}
                                value={values.engine_cc} />

                            <MyTextInput
                                label="Year"
                                icon="calendar"
                                placeholder="1993"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('year')}
                                onBlur={handleBlur('year')}
                                value={values.year} />

                            <MyTextInput
                                label="Fuel"
                                icon="unfold"
                                placeholder="Petrol"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('fuel')}
                                onBlur={handleBlur('fuel')}
                                value={values.fuel} />
                            <MyTextInput
                                label="Horse Power"
                                icon="issue-reopened"
                                placeholder="UFC"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('horse_power')}
                                onBlur={handleBlur('horse_power')}
                                value={values.horse_power} />
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                onValueChange={handleChange('brand')}
                                onBlur={handleBlur('brand')}
                                selectedValue={values.brand}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {cars.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.make.toString()}
                                            value={item.make.toString()}
                                            key={item.id_trim.toString()}
                                        />
                                    )
                                })}
                            </Picker>
                            <Text style={{ color: brandPrimary, fontSize: 14 }}>
                                Some description:
                            </Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor={tertiary}
                                placeholder="Ex.: I used to drink after eat"
                                style={{
                                    height: 170,
                                    backgroundColor: secondary,
                                    color: primary
                                }}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                            <VehiclesT.MessageBox type={messageType}>{message}</VehiclesT.MessageBox>
                            {!isSubmitting &&
                                <VehiclesT.StyledBotton onPress={() => handleSubmit()}>
                                    <VehiclesT.BottonText>
                                        Save
                                    </VehiclesT.BottonText>
                                </VehiclesT.StyledBotton>}
                            {isSubmitting &&
                                <VehiclesT.StyledBotton disabled={true}>
                                    <ActivityIndicator size="large" color={primary}>
                                    </ActivityIndicator>
                                </VehiclesT.StyledBotton>}
                        </VehiclesT.StyledFormArea>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

const MyTextInput = ({ label, icon, ...props }) => {
    return (<View>
        <VehiclesT.LeftIcon><Text>
            <Octicons name={icon} size={20} color={primary} /></Text>
        </VehiclesT.LeftIcon>
        <VehiclesT.StyledInputLabel><Text>{label}</Text></VehiclesT.StyledInputLabel>
        <VehiclesT.StyledTextInput {...props} />
    </View>);
};

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
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
})

export default CreateVehicle