import { StyleSheet } from "react-native";

export const theme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        backgroundColor: '#3DD6D0',
        padding: 16,
        width: '100%',
    },
    headerText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 500,
    },
    btn: {
        marginBlock: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 500,
        marginBlock: 10,
    },
    content: {
        fontSize: 20,
    },
    listitem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginInline: 8,
        paddingBlock: 6,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
    },
    title: {
        fontWeight: 500,
    },
    subtitle: {
        fontWeight: 300,
    },
    lead: {
        paddingInline: 4,
    },
    tail: {
        paddingInline: 4,
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingInline: 8,
    },
    detailMain: {
        paddingInline: 16,
    },
    detailText: {
        marginBlock: 2,
    },
});