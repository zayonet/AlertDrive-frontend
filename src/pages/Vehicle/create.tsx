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
import SelectList from '../../components/SelectList'
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
interface ICar {
    id: number;
    year: string;
    make: string;
    model: string;
}
const yesOrNo = [
    { name: "", id: 1 },
    { name: "Yes", id: 2 },
    { name: "No", id: 3 }
];

//import cars_db from '../../database/dbCars';
const CreateVehicle: React.FC = ({ navigation }: any) => {
    const { signOut, user, token } = useAuth();
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const [cars, setCars] = React.useState([]);
    const [carItem, setCarItem] = React.useState();
    const [choosenCar, setChoosenCar] = React.useState<ICar>();
    const [selected, setSelected] = React.useState("");
    const Authorization = `${token}`;

    /* async function getCarsAsync() {
        const response = await api.get(`/car`)
        const carsUser = (response.data as ICars[]).map((item: ICars) => {
            return {
                id_trim: item.id_trim,
                key: item.id_trim,
                //value: 'Brand: ' + item.make + ' model: ' + item.model + ' year: ' + item.year_from + ' serie:  ' + item.series.toString() + ' engine: ' + item.engine_type.toString(),
                value: item.make + ', ' + item.model + ', ' + item.year_from + ', ' + item.series.toString() + ', ' + item.engine_type.toString(),
                make: item.make,
                model: item.model,
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
    } */
    async function getCarsAsync() {
        //const response = await api.get(`/car`)
        const carsUser = cars_db.map((item: any) => {
            return {
                key: item.id,
                //value: 'Brand: ' + item.make + ' model: ' + item.model + ' year: ' + item.year_from + ' serie:  ' + item.series.toString() + ' engine: ' + item.engine_type.toString(),
                value: item.make + ', ' + item.model + ', ' + item.year,
                year: item.year,
                make: item.make,
                model: item.model,
            }
        })
        setCars(carsUser)
    }
    async function getSelectedCar(id_trim: any) {
        console.log(id_trim)
        const carsUser = cars_db.find(item => item.id === id_trim)
        console.log(carsUser)
        setChoosenCar(carsUser)
    }
    async function getChoosenCar(id_trim: any) {
        console.log(id_trim)
        const response = await api.get(`/car/${id_trim}`)
        console.log("Imprima")

        const carf = response.data.map((car: any) => {
            return {
                id_trim: car.id_trim,
                model: car.model,
                make: car.make,
                generation: car.generation,
                year_from: car.year_from,
                year_to: car.year_to,
                series: car.series,
                trim: car.trim,
                body_type: car.body_type,
                load_height_mm: car.load_height_mm,
                number_of_seats: car.number_of_seats,
                length_mm: car.length_mm,
                width_mm: car.width_mm,
                height_mm: car.height_mm,
                wheelbase_mm: car.wheelbase_mm,
                front_track_mm: car.front_track_mm,
                rear_track_mm: car.rear_track_mm,
                curb_weight_kg: car.curb_weight_kg,
                wheel_size_r14: car.wheel_size_r14,
                ground_clearance_mm: car.ground_clearance_mm,
                trailer_load_with_brakes_kg: car.trailer_load_with_brakes_kg,
                payload_kg: car.payload_kg,
                back_track_width_mm: car.back_track_width_mm,
                front_track_width_mm: car.front_track_width_mm,
                clearance_mm: car.clearance_mm,
                full_weight_kg: car.full_weight_kg,
                front_rear_axle_load_kg: car.front_rear_axle_load_kg,
                max_trunk_capacity_l: car.max_trunk_capacity_l,
                cargo_compartment_length_width_height_mm: car.cargo_compartment_length_width_height_mm,
                cargo_volume_m3: car.cargo_volume_m3,
                minimum_trunk_capacity_l: car.minimum_trunk_capacity_l,
                maximum_torque_n_m: car.maximum_torque_n_m,
                injection_type: car.injection_type,
                overhead_camshaft: car.overhead_camshaft,
                cylinder_layout: car.cylinder_layout,
                number_of_cylinders: car.number_of_cylinders,
                compression_ratio: car.compression_ratio,
                engine_type: car.engine_type,
                valves_per_cylinder: car.valves_per_cylinder,
                boost_type: car.boost_type,
                cylinder_bore_mm: car.cylinder_bore_mm,
                stroke_cycle_mm: car.stroke_cycle_mm,
                engine_placement: car.engine_placement,
                cylinder_bore_and_stroke_cycle_mm: car.cylinder_bore_and_stroke_cycle_mm,
                turnover_of_maximum_torque_rpm: car.turnover_of_maximum_torque_rpm,
                max_power_kw: car.max_power_kw,
                presence_of_intercooler: car.presence_of_intercooler,
                capacity_cm3: car.capacity_cm3,
                engine_hp: car.engine_hp,
                engine_hp_rpm: car.engine_hp_rpm,
                drive_wheels: car.drive_wheels,
                bore_stroke_ratio: car.bore_stroke_ratio,
                number_of_gears: car.number_of_gears,
                turning_circle_m: car.turning_circle_m,
                transmission: car.transmission,
                mixed_fuel_consumption_per_100_km_l: car.mixed_fuel_consumption_per_100_km_l,
                range_km: car.range_km,
                emission_standards: car.emission_standards,
                fuel_tank_capacity_l: car.fuel_tank_capacity_l,
                acceleration_0_100_km_h_s: car.acceleration_0_100_km_h_s,
                max_speed_km_per_h: car.max_speed_km_per_h,
                city_fuel_per_100km_l: car.city_fuel_per_100km_l,
                CO2_emissions_g_km: car.CO2_emissions_g_km,
                fuel_grade: car.fuel_grade,
                highway_fuel_per_100km_l: car.highway_fuel_per_100km_l,
                back_suspension: car.back_suspension,
                rear_brakes: car.rear_brakes,
                front_brakes: car.front_brakes,
                front_suspension: car.front_suspension,
                steering_type: car.steering_type,
                car_class: car.car_class,
                country_of_origin: car.country_of_origin,
                number_of_doors: car.number_of_doors,
                safety_assessment: car.safety_assessment,
                rating_name: car.rating_name,
                battery_capacity_KW_per_h: car.battery_capacity_KW_per_h,
                electric_range_km: car.electric_range_km,
                charging_time_h: car.charging_time_h
            }
        })
        setChoosenCar(carf)

    }
    React.useEffect(() => {

        /*getCarsAsync()*/
        const updateNavigation = navigation.addListener('focus', () => {
            getSelectedCar(id_trim)

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


    /* React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginBottom: 15 }}>
                    <Picker
                        enabled={true}
                        mode="dropdown"
                        onValueChange={(carItem) => searchFilterFunction(carItem)}
                        selectedValue={carItem}
                        itemStyle={styles.pickerSelectStyle}
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
                </View>
            ),
        });
    }, [navigation]); */
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ marginBottom: 2, marginTop: 60 }}>
                    <SelectList
                        onSelect={() => getSelectedCar(selected)}
                        setSelected={setSelected}
                        data={cars}
                        arrowicon={<Octicons name="chevron-down" size={14} color={brandPrimary} />}
                        searchicon={<Octicons name="search" size={14} color={brandPrimary} />}
                        search={true}
                        boxStyles={{ borderRadius: 0, borderColor: brandPrimary }} //override default styles                        
                        placeholder="Select your car Brand"
                        dropdownItemStyles={{ borderColor: brandPrimary }}
                    />
                    <Text>{choosenCar?.make}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Formik
                        initialValues={{
                            user_id: user?.id,
                            brand: choosenCar?.make,
                            model: choosenCar?.model,
                            registration_number: "",
                            registration_country: "",
                            engine_cc: "",
                            year: choosenCar?.year,
                            fuel: "",
                            horse_power: "",
                            description: ""
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
        backgroundColor: brandPrimary,
        Padding: 10,
        paddingLeft: 50,
        paddingRight: 5,
        borderRadius: 50,
        fontSize: 16,
        height: 39,
        marginVertical: 20,
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
