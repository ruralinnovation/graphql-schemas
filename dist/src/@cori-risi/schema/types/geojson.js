"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const json_1 = require("./json");
function coerceCoordinates(value) {
    return value;
}
function parseCoordinates(valueAST) {
    return valueAST.value;
}
const GeoJSON = {
    TypeEnum: new graphql_1.GraphQLEnumType({
        name: 'GeoJSONType',
        description: 'Enumeration of all GeoJSON object types.',
        values: {
            Point: { value: 'Point' },
            MultiPoint: { value: 'MultiPoint' },
            LineString: { value: 'LineString' },
            MultiLineString: { value: 'MultiLineString' },
            Polygon: { value: 'Polygon' },
            MultiPolygon: { value: 'MultiPolygon' },
            GeometryCollection: { value: 'GeometryCollection' },
            Feature: { value: 'Feature' },
            FeatureCollection: { value: 'FeatureCollection' },
        },
    }),
    CoordinatesScalar: new graphql_1.GraphQLScalarType({
        name: 'GeoJSONCoordinates',
        description: 'A (multidimensional) set of coordinates following x, y, z order.',
        serialize: coerceCoordinates,
        parseValue: coerceCoordinates,
        parseLiteral: parseCoordinates,
    }),
    JSONObject: json_1.JSONObject,
    PointObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONPoint',
        description: 'Object describing a single geographical point.',
        interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            coordinates: { type: GeoJSON.CoordinatesScalar },
        }),
    }),
    MultiPointObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONMultiPoint',
        description: 'Object describing multiple geographical points.',
        interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            coordinates: { type: GeoJSON.CoordinatesScalar },
        }),
    }),
    LineStringObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONLineString',
        description: 'Object describing a single connected sequence of geographical points.',
        interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            coordinates: { type: GeoJSON.CoordinatesScalar },
        }),
    }),
    MultiLineStringObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONMultiLineString',
        description: 'Object describing multiple connected sequences of geographical points.',
        interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            coordinates: { type: GeoJSON.CoordinatesScalar },
        }),
    }),
    PolygonObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONPolygon',
        description: 'Object describing a single shape formed by a set of geographical points.',
        interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            coordinates: { type: GeoJSON.CoordinatesScalar },
        }),
    }),
    MultiPolygonObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONMultiPolygon',
        description: 'Object describing multiple shapes formed by sets of geographical points.',
        interfaces: () => [GeoJSON.GeoJSONInterface, GeoJSON.GeometryInterface],
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            coordinates: { type: GeoJSON.CoordinatesScalar },
        }),
    }),
    GeometryCollectionObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONGeometryCollection',
        description: 'A set of multiple geometries, possibly of various types.',
        interfaces: () => [GeoJSON.GeoJSONInterface],
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            geometries: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(GeoJSON.GeometryInterface))) },
        }),
    }),
    FeatureObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONFeature',
        description: 'An object that links a geometry to properties in order to provide context.',
        interfaces: () => [GeoJSON.GeoJSONInterface],
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            geometry: { type: GeoJSON.GeometryInterface },
            properties: { type: GeoJSON.JSONObject },
            id: { type: graphql_1.GraphQLString },
        }),
    }),
    FeatureCollectionObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONFeatureCollection',
        description: 'A set of multiple features.',
        interfaces: () => [GeoJSON.GeoJSONInterface],
        fields: () => ({
            // id: { type: Str },
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            features: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(new graphql_1.GraphQLNonNull(GeoJSON.FeatureObject))) },
        }),
    }),
    CRSTypeEnum: new graphql_1.GraphQLEnumType({
        name: 'GeoJSONCRSType',
        description: 'Enumeration of all GeoJSON CRS object types.',
        values: {
            name: { value: 'name' },
            link: { value: 'link' },
        },
    }),
    NamedCRSPropertiesObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONNamedCRSProperties',
        description: 'Properties for name based CRS object.',
        fields: () => ({
            name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        }),
    }),
    LinkedCRSPropertiesObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONLinkedCRSProperties',
        description: 'Properties for link based CRS object.',
        fields: () => ({
            href: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            type: { type: graphql_1.GraphQLString },
        }),
    }),
    CRSPropertiesUnion: new graphql_1.GraphQLUnionType({
        name: 'GeoJSONCRSProperties',
        description: 'CRS object properties.',
        types: () => [GeoJSON.NamedCRSPropertiesObject, GeoJSON.LinkedCRSPropertiesObject],
        resolveType: value => {
            if (value.name) {
                return GeoJSON.NamedCRSPropertiesObject;
            }
            if (value.href) {
                return GeoJSON.LinkedCRSPropertiesObject;
            }
        },
    }),
    CoordinateReferenceSystemObject: new graphql_1.GraphQLObjectType({
        name: 'GeoJSONCoordinateReferenceSystem',
        description: 'Coordinate Reference System (CRS) object.',
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.CRSTypeEnum) },
            properties: { type: new graphql_1.GraphQLNonNull(GeoJSON.CRSPropertiesUnion) },
        }),
    }),
    GeoJSONInterface: new graphql_1.GraphQLInterfaceType({
        name: 'GeoJSONInterface',
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
        }),
        resolveType: value => GeoJSON[`${value.type}Object`],
    }),
    GeometryInterface: new graphql_1.GraphQLInterfaceType({
        name: 'GeoJSONGeometryInterface',
        fields: () => ({
            type: { type: new graphql_1.GraphQLNonNull(GeoJSON.TypeEnum) },
            crs: { type: GeoJSON.CoordinateReferenceSystemObject },
            bbox: { type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat) },
            coordinates: { type: GeoJSON.CoordinatesScalar },
        }),
        resolveType: value => GeoJSON[`${value.type}Object`].name,
        // resolveType: value => value.type,
    }),
    GeometryTypeUnion: new graphql_1.GraphQLUnionType({
        name: 'GeoJSONGeometryTypes',
        description: 'Geometry Types',
        types: () => [
            GeoJSON.PointObject,
            GeoJSON.MultiLineStringObject,
            GeoJSON.LineStringObject,
            GeoJSON.PolygonObject,
            GeoJSON.MultiPointObject,
            GeoJSON.MultiPolygonObject,
        ],
        resolveType: value => {
            if (value.value === GeoJSON.TypeEnum.Point.value) {
                return GeoJSON.PointObject.name;
            }
            if (value.value === GeoJSON.TypeEnum.MultiLineString.value) {
                return GeoJSON.MultiLineStringObject.name;
            }
            if (value.value === GeoJSON.TypeEnum.LineString.value) {
                return GeoJSON.LineStringObject.name;
            }
            if (value.value === GeoJSON.TypeEnum.MultiPoint.value) {
                return GeoJSON.MultiPointObject.name;
            }
            if (value.value === GeoJSON.TypeEnum.Polygon.value) {
                return GeoJSON.PolygonObject.name;
            }
            if (value.value === GeoJSON.TypeEnum.MultiPolygon.value) {
                return GeoJSON.MultiPolygonObject.name;
            }
            if (value.value === GeoJSON.TypeEnum.MultiPoint.value) {
                return GeoJSON.MultiPointObject.name;
            }
        },
    }),
};
exports.default = GeoJSON;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS90eXBlcy9nZW9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBVWlCO0FBQ2pCLGlDQUFvQztBQUVwQyxTQUFTLGlCQUFpQixDQUFDLEtBQVU7SUFDbkMsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFhO0lBQ3JDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQztBQUN4QixDQUFDO0FBRUQsTUFBTSxPQUFPLEdBQUc7SUFDZCxRQUFRLEVBQUUsSUFBSSx5QkFBUSxDQUFDO1FBQ3JCLElBQUksRUFBRSxhQUFhO1FBQ25CLFdBQVcsRUFBRSwwQ0FBMEM7UUFDdkQsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUN6QixVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO1lBQ25DLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7WUFDbkMsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFO1lBQzdDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7WUFDN0IsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtZQUN2QyxrQkFBa0IsRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRTtZQUNuRCxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQzdCLGlCQUFpQixFQUFFLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFO1NBQ2xEO0tBQ0YsQ0FBQztJQUVGLGlCQUFpQixFQUFFLElBQUksMkJBQVUsQ0FBQztRQUNoQyxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLFdBQVcsRUFBRSxrRUFBa0U7UUFDL0UsU0FBUyxFQUFFLGlCQUFp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TyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ25ELE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDcEMsQ0FBQztZQUNELElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDeEQsT0FBTyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1lBQ3pDLENBQUM7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3RELE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQztLQUNGLENBQUM7Q0FDSCxDQUFDO0FBRUYsa0JBQWUsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR3JhcGhRTFN0cmluZyBhcyBTdHIsXG4gIEdyYXBoUUxMaXN0IGFzIExpc3QsXG4gIEdyYXBoUUxFbnVtVHlwZSBhcyBFbnVtVHlwZSxcbiAgR3JhcGhRTE9iamVjdFR5cGUgYXMgT2JqZWN0VHlwZSxcbiAgR3JhcGhRTFNjYWxhclR5cGUgYXMgU2NhbGFyVHlwZSxcbiAgR3JhcGhRTEludGVyZmFjZVR5cGUgYXMgSW50ZXJmYWNlVHlwZSxcbiAgR3JhcGhRTFVuaW9uVHlwZSBhcyBVbmlvblR5cGUsXG4gIEdyYXBoUUxOb25OdWxsIGFzIE5vbk51bGwsXG4gIEdyYXBoUUxGbG9hdCBhcyBGbG9hdCxcbn0gZnJvbSAnZ3JhcGhxbCc7XG5pbXBvcnQgeyBKU09OT2JqZWN0IH0gZnJvbSBcIi4vanNvblwiO1xuXG5mdW5jdGlvbiBjb2VyY2VDb29yZGluYXRlcyh2YWx1ZTogYW55KSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb29yZGluYXRlcyh2YWx1ZUFTVDogYW55KSB7XG4gIHJldHVybiB2YWx1ZUFTVC52YWx1ZTtcbn1cblxuY29uc3QgR2VvSlNPTiA9IHtcbiAgVHlwZUVudW06IG5ldyBFbnVtVHlwZSh7XG4gICAgbmFtZTogJ0dlb0pTT05UeXBlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0VudW1lcmF0aW9uIG9mIGFsbCBHZW9KU09OIG9iamVjdCB0eXBlcy4nLFxuICAgIHZhbHVlczoge1xuICAgICAgUG9pbnQ6IHsgdmFsdWU6ICdQb2ludCcgfSxcbiAgICAgIE11bHRpUG9pbnQ6IHsgdmFsdWU6ICdNdWx0aVBvaW50JyB9LFxuICAgICAgTGluZVN0cmluZzogeyB2YWx1ZTogJ0xpbmVTdHJpbmcnIH0sXG4gICAgICBNdWx0aUxpbmVTdHJpbmc6IHsgdmFsdWU6ICdNdWx0aUxpbmVTdHJpbmcnIH0sXG4gICAgICBQb2x5Z29uOiB7IHZhbHVlOiAnUG9seWdvbicgfSxcbiAgICAgIE11bHRpUG9seWdvbjogeyB2YWx1ZTogJ011bHRpUG9seWdvbicgfSxcbiAgICAgIEdlb21ldHJ5Q29sbGVjdGlvbjogeyB2YWx1ZTogJ0dlb21ldHJ5Q29sbGVjdGlvbicgfSxcbiAgICAgIEZlYXR1cmU6IHsgdmFsdWU6ICdGZWF0dXJlJyB9LFxuICAgICAgRmVhdHVyZUNvbGxlY3Rpb246IHsgdmFsdWU6ICdGZWF0dXJlQ29sbGVjdGlvbicgfSxcbiAgICB9LFxuICB9KSxcblxuICBDb29yZGluYXRlc1NjYWxhcjogbmV3IFNjYWxhclR5cGUoe1xuICAgIG5hbWU6ICdHZW9KU09OQ29vcmRpbmF0ZXMnLFxuICAgIGRlc2NyaXB0aW9uOiAnQSAobXVsdGlkaW1lbnNpb25hbCkgc2V0IG9mIGNvb3JkaW5hdGVzIGZvbGxvd2luZyB4LCB5LCB6IG9yZGVyLicsXG4gICAgc2VyaWFsaXplOiBjb2VyY2VDb29yZGluYXRlcyxcbiAgICBwYXJzZVZhbHVlOiBjb2VyY2VDb29yZGluYXRlcyxcbiAgICBwYXJzZUxpdGVyYWw6IHBhcnNlQ29vcmRpbmF0ZXMsXG4gIH0pLFxuXG4gIEpTT05PYmplY3Q6IEpTT05PYmplY3QsXG5cbiAgUG9pbnRPYmplY3Q6IG5ldyBPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnR2VvSlNPTlBvaW50JyxcbiAgICBkZXNjcmlwdGlvbjogJ09iamVjdCBkZXNjcmliaW5nIGEgc2luZ2xlIGdlb2dyYXBoaWNhbCBwb2ludC4nLFxuICAgIGludGVyZmFjZXM6ICgpID0+IFtHZW9KU09OLkdlb0pTT05JbnRlcmZhY2UsIEdlb0pTT04uR2VvbWV0cnlJbnRlcmZhY2VdLFxuICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgIHR5cGU6IHsgdHlwZTogbmV3IE5vbk51bGwoR2VvSlNPTi5UeXBlRW51bSkgfSxcbiAgICAgIGNyczogeyB0eXBlOiBHZW9KU09OLkNvb3JkaW5hdGVSZWZlcmVuY2VTeXN0ZW1PYmplY3QgfSxcbiAgICAgIGJib3g6IHsgdHlwZTogbmV3IExpc3QoRmxvYXQpIH0sXG4gICAgICBjb29yZGluYXRlczogeyB0eXBlOiBHZW9KU09OLkNvb3JkaW5hdGVzU2NhbGFyIH0sXG4gICAgfSksXG4gIH0pLFxuXG4gIE11bHRpUG9pbnRPYmplY3Q6IG5ldyBPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnR2VvSlNPTk11bHRpUG9pbnQnLFxuICAgIGRlc2NyaXB0aW9uOiAnT2JqZWN0IGRlc2NyaWJpbmcgbXVsdGlwbGUgZ2VvZ3JhcGhpY2FsIHBvaW50cy4nLFxuICAgIGludGVyZmFjZXM6ICgpID0+IFtHZW9KU09OLkdlb0pTT05JbnRlcmZhY2UsIEdlb0pTT04uR2VvbWV0cnlJbnRlcmZhY2VdLFxuICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgIHR5cGU6IHsgdHlwZTogbmV3IE5vbk51bGwoR2VvSlNPTi5UeXBlRW51bSkgfSxcbiAgICAgIGNyczogeyB0eXBlOiBHZW9KU09OLkNvb3JkaW5hdGVSZWZlcmVuY2VTeXN0ZW1PYmplY3QgfSxcbiAgICAgIGJib3g6IHsgdHlwZTogbmV3IExpc3QoRmxvYXQpIH0sXG4gICAgICBjb29yZGluYXRlczogeyB0eXBlOiBHZW9KU09OLkNvb3JkaW5hdGVzU2NhbGFyIH0sXG4gICAgfSksXG4gIH0pLFxuXG4gIExpbmVTdHJpbmdPYmplY3Q6IG5ldyBPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnR2VvSlNPTkxpbmVTdHJpbmcnLFxuICAgIGRlc2NyaXB0aW9uOiAnT2JqZWN0IGRlc2NyaWJpbmcgYSBzaW5nbGUgY29ubmVjdGVkIHNlcXVlbmNlIG9mIGdlb2dyYXBoaWNhbCBwb2ludHMuJyxcbiAgICBpbnRlcmZhY2VzOiAoKSA9PiBbR2VvSlNPTi5HZW9KU09OSW50ZXJmYWNlLCBHZW9KU09OLkdlb21ldHJ5SW50ZXJmYWNlXSxcbiAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICB0eXBlOiB7IHR5cGU6IG5ldyBOb25OdWxsKEdlb0pTT04uVHlwZUVudW0pIH0sXG4gICAgICBjcnM6IHsgdHlwZTogR2VvSlNPTi5Db29yZGluYXRlUmVmZXJlbmNlU3lzdGVtT2JqZWN0IH0sXG4gICAgICBiYm94OiB7IHR5cGU6IG5ldyBMaXN0KEZsb2F0KSB9LFxuICAgICAgY29vcmRpbmF0ZXM6IHsgdHlwZTogR2VvSlNPTi5Db29yZGluYXRlc1NjYWxhciB9LFxuICAgIH0pLFxuICB9KSxcblxuICBNdWx0aUxpbmVTdHJpbmdPYmplY3Q6IG5ldyBPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnR2VvSlNPTk11bHRpTGluZVN0cmluZycsXG4gICAgZGVzY3JpcHRpb246ICdPYmplY3QgZGVzY3JpYmluZyBtdWx0aXBsZSBjb25uZWN0ZWQgc2VxdWVuY2VzIG9mIGdlb2dyYXBoaWNhbCBwb2ludHMuJyxcbiAgICBpbnRlcmZhY2VzOiAoKSA9PiBbR2VvSlNPTi5HZW9KU09OSW50ZXJmYWNlLCBHZW9KU09OLkdlb21ldHJ5SW50ZXJmYWNlXSxcbiAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICB0eXBlOiB7IHR5cGU6IG5ldyBOb25OdWxsKEdlb0pTT04uVHlwZUVudW0pIH0sXG4gICAgICBjcnM6IHsgdHlwZTogR2VvSlNPTi5Db29yZGluYXRlUmVmZXJlbmNlU3lzdGVtT2JqZWN0IH0sXG4gICAgICBiYm94OiB7IHR5cGU6IG5ldyBMaXN0KEZsb2F0KSB9LFxuICAgICAgY29vcmRpbmF0ZXM6IHsgdHlwZTogR2VvSlNPTi5Db29yZGluYXRlc1NjYWxhciB9LFxuICAgIH0pLFxuICB9KSxcblxuICBQb2x5Z29uT2JqZWN0OiBuZXcgT2JqZWN0VHlwZSh7XG4gICAgbmFtZTogJ0dlb0pTT05Qb2x5Z29uJyxcbiAgICBkZXNjcmlwdGlvbjogJ09iamVjdCBkZXNjcmliaW5nIGEgc2luZ2xlIHNoYXBlIGZvcm1lZCBieSBhIHNldCBvZiBnZW9ncmFwaGljYWwgcG9pbnRzLicsXG4gICAgaW50ZXJmYWNlczogKCkgPT4gW0dlb0pTT04uR2VvSlNPTkludGVyZmFjZSwgR2VvSlNPTi5HZW9tZXRyeUludGVyZmFjZV0sXG4gICAgZmllbGRzOiAoKSA9PiAoe1xuICAgICAgdHlwZTogeyB0eXBlOiBuZXcgTm9uTnVsbChHZW9KU09OLlR5cGVFbnVtKSB9LFxuICAgICAgY3JzOiB7IHR5cGU6IEdlb0pTT04uQ29vcmRpbmF0ZVJlZmVyZW5jZVN5c3RlbU9iamVjdCB9LFxuICAgICAgYmJveDogeyB0eXBlOiBuZXcgTGlzdChGbG9hdCkgfSxcbiAgICAgIGNvb3JkaW5hdGVzOiB7IHR5cGU6IEdlb0pTT04uQ29vcmRpbmF0ZXNTY2FsYXIgfSxcbiAgICB9KSxcbiAgfSksXG5cbiAgTXVsdGlQb2x5Z29uT2JqZWN0OiBuZXcgT2JqZWN0VHlwZSh7XG4gICAgbmFtZTogJ0dlb0pTT05NdWx0aVBvbHlnb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnT2JqZWN0IGRlc2NyaWJpbmcgbXVsdGlwbGUgc2hhcGVzIGZvcm1lZCBieSBzZXRzIG9mIGdlb2dyYXBoaWNhbCBwb2ludHMuJyxcbiAgICBpbnRlcmZhY2VzOiAoKSA9PiBbR2VvSlNPTi5HZW9KU09OSW50ZXJmYWNlLCBHZW9KU09OLkdlb21ldHJ5SW50ZXJmYWNlXSxcbiAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICB0eXBlOiB7IHR5cGU6IG5ldyBOb25OdWxsKEdlb0pTT04uVHlwZUVudW0pIH0sXG4gICAgICBjcnM6IHsgdHlwZTogR2VvSlNPTi5Db29yZGluYXRlUmVmZXJlbmNlU3lzdGVtT2JqZWN0IH0sXG4gICAgICBiYm94OiB7IHR5cGU6IG5ldyBMaXN0KEZsb2F0KSB9LFxuICAgICAgY29vcmRpbmF0ZXM6IHsgdHlwZTogR2VvSlNPTi5Db29yZGluYXRlc1NjYWxhciB9LFxuICAgIH0pLFxuICB9KSxcblxuICBHZW9tZXRyeUNvbGxlY3Rpb25PYmplY3Q6IG5ldyBPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnR2VvSlNPTkdlb21ldHJ5Q29sbGVjdGlvbicsXG4gICAgZGVzY3JpcHRpb246ICdBIHNldCBvZiBtdWx0aXBsZSBnZW9tZXRyaWVzLCBwb3NzaWJseSBvZiB2YXJpb3VzIHR5cGVzLicsXG4gICAgaW50ZXJmYWNlczogKCkgPT4gW0dlb0pTT04uR2VvSlNPTkludGVyZmFjZV0sXG4gICAgZmllbGRzOiAoKSA9PiAoe1xuICAgICAgdHlwZTogeyB0eXBlOiBuZXcgTm9uTnVsbChHZW9KU09OLlR5cGVFbnVtKSB9LFxuICAgICAgY3JzOiB7IHR5cGU6IEdlb0pTT04uQ29vcmRpbmF0ZVJlZmVyZW5jZVN5c3RlbU9iamVjdCB9LFxuICAgICAgYmJveDogeyB0eXBlOiBuZXcgTGlzdChGbG9hdCkgfSxcbiAgICAgIGdlb21ldHJpZXM6IHsgdHlwZTogbmV3IE5vbk51bGwobmV3IExpc3QobmV3IE5vbk51bGwoR2VvSlNPTi5HZW9tZXRyeUludGVyZmFjZSkpKSB9LFxuICAgIH0pLFxuICB9KSxcblxuICBGZWF0dXJlT2JqZWN0OiBuZXcgT2JqZWN0VHlwZSh7XG4gICAgbmFtZTogJ0dlb0pTT05GZWF0dXJlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0FuIG9iamVjdCB0aGF0IGxpbmtzIGEgZ2VvbWV0cnkgdG8gcHJvcGVydGllcyBpbiBvcmRlciB0byBwcm92aWRlIGNvbnRleHQuJyxcbiAgICBpbnRlcmZhY2VzOiAoKSA9PiBbR2VvSlNPTi5HZW9KU09OSW50ZXJmYWNlXSxcbiAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICB0eXBlOiB7IHR5cGU6IG5ldyBOb25OdWxsKEdlb0pTT04uVHlwZUVudW0pIH0sXG4gICAgICBjcnM6IHsgdHlwZTogR2VvSlNPTi5Db29yZGluYXRlUmVmZXJlbmNlU3lzdGVtT2JqZWN0IH0sXG4gICAgICBiYm94OiB7IHR5cGU6IG5ldyBMaXN0KEZsb2F0KSB9LFxuICAgICAgZ2VvbWV0cnk6IHsgdHlwZTogR2VvSlNPTi5HZW9tZXRyeUludGVyZmFjZSB9LFxuICAgICAgcHJvcGVydGllczogeyB0eXBlOiBHZW9KU09OLkpTT05PYmplY3QgfSxcbiAgICAgIGlkOiB7IHR5cGU6IFN0ciB9LFxuICAgIH0pLFxuICB9KSxcblxuICBGZWF0dXJlQ29sbGVjdGlvbk9iamVjdDogbmV3IE9iamVjdFR5cGUoe1xuICAgIG5hbWU6ICdHZW9KU09ORmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnQSBzZXQgb2YgbXVsdGlwbGUgZmVhdHVyZXMuJyxcbiAgICBpbnRlcmZhY2VzOiAoKSA9PiBbR2VvSlNPTi5HZW9KU09OSW50ZXJmYWNlXSxcbiAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAvLyBpZDogeyB0eXBlOiBTdHIgfSxcbiAgICAgIHR5cGU6IHsgdHlwZTogbmV3IE5vbk51bGwoR2VvSlNPTi5UeXBlRW51bSkgfSxcbiAgICAgIGNyczogeyB0eXBlOiBHZW9KU09OLkNvb3JkaW5hdGVSZWZlcmVuY2VTeXN0ZW1PYmplY3QgfSxcbiAgICAgIGJib3g6IHsgdHlwZTogbmV3IExpc3QoRmxvYXQpIH0sXG4gICAgICBmZWF0dXJlczogeyB0eXBlOiBuZXcgTm9uTnVsbChuZXcgTGlzdChuZXcgTm9uTnVsbChHZW9KU09OLkZlYXR1cmVPYmplY3QpKSkgfSxcbiAgICB9KSxcbiAgfSksXG5cbiAgQ1JTVHlwZUVudW06IG5ldyBFbnVtVHlwZSh7XG4gICAgbmFtZTogJ0dlb0pTT05DUlNUeXBlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0VudW1lcmF0aW9uIG9mIGFsbCBHZW9KU09OIENSUyBvYmplY3QgdHlwZXMuJyxcbiAgICB2YWx1ZXM6IHtcbiAgICAgIG5hbWU6IHsgdmFsdWU6ICduYW1lJyB9LFxuICAgICAgbGluazogeyB2YWx1ZTogJ2xpbmsnIH0sXG4gICAgfSxcbiAgfSksXG5cbiAgTmFtZWRDUlNQcm9wZXJ0aWVzT2JqZWN0OiBuZXcgT2JqZWN0VHlwZSh7XG4gICAgbmFtZTogJ0dlb0pTT05OYW1lZENSU1Byb3BlcnRpZXMnLFxuICAgIGRlc2NyaXB0aW9uOiAnUHJvcGVydGllcyBmb3IgbmFtZSBiYXNlZCBDUlMgb2JqZWN0LicsXG4gICAgZmllbGRzOiAoKSA9PiAoe1xuICAgICAgbmFtZTogeyB0eXBlOiBuZXcgTm9uTnVsbChTdHIpIH0sXG4gICAgfSksXG4gIH0pLFxuXG4gIExpbmtlZENSU1Byb3BlcnRpZXNPYmplY3Q6IG5ldyBPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnR2VvSlNPTkxpbmtlZENSU1Byb3BlcnRpZXMnLFxuICAgIGRlc2NyaXB0aW9uOiAnUHJvcGVydGllcyBmb3IgbGluayBiYXNlZCBDUlMgb2JqZWN0LicsXG4gICAgZmllbGRzOiAoKSA9PiAoe1xuICAgICAgaHJlZjogeyB0eXBlOiBuZXcgTm9uTnVsbChTdHIpIH0sXG4gICAgICB0eXBlOiB7IHR5cGU6IFN0ciB9LFxuICAgIH0pLFxuICB9KSxcblxuICBDUlNQcm9wZXJ0aWVzVW5pb246IG5ldyBVbmlvblR5cGUoe1xuICAgIG5hbWU6ICdHZW9KU09OQ1JTUHJvcGVydGllcycsXG4gICAgZGVzY3JpcHRpb246ICdDUlMgb2JqZWN0IHByb3BlcnRpZXMuJyxcbiAgICB0eXBlczogKCkgPT4gW0dlb0pTT04uTmFtZWRDUlNQcm9wZXJ0aWVzT2JqZWN0LCBHZW9KU09OLkxpbmtlZENSU1Byb3BlcnRpZXNPYmplY3RdLFxuICAgIHJlc29sdmVUeXBlOiB2YWx1ZSA9PiB7XG4gICAgICBpZiAodmFsdWUubmFtZSkge1xuICAgICAgICByZXR1cm4gR2VvSlNPTi5OYW1lZENSU1Byb3BlcnRpZXNPYmplY3Q7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUuaHJlZikge1xuICAgICAgICByZXR1cm4gR2VvSlNPTi5MaW5rZWRDUlNQcm9wZXJ0aWVzT2JqZWN0O1xuICAgICAgfVxuICAgIH0sXG4gIH0pLFxuXG4gIENvb3JkaW5hdGVSZWZlcmVuY2VTeXN0ZW1PYmplY3Q6IG5ldyBPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnR2VvSlNPTkNvb3JkaW5hdGVSZWZlcmVuY2VTeXN0ZW0nLFxuICAgIGRlc2NyaXB0aW9uOiAnQ29vcmRpbmF0ZSBSZWZlcmVuY2UgU3lzdGVtIChDUlMpIG9iamVjdC4nLFxuICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgIHR5cGU6IHsgdHlwZTogbmV3IE5vbk51bGwoR2VvSlNPTi5DUlNUeXBlRW51bSkgfSxcbiAgICAgIHByb3BlcnRpZXM6IHsgdHlwZTogbmV3IE5vbk51bGwoR2VvSlNPTi5DUlNQcm9wZXJ0aWVzVW5pb24pIH0sXG4gICAgfSksXG4gIH0pLFxuXG4gIEdlb0pTT05JbnRlcmZhY2U6IG5ldyBJbnRlcmZhY2VUeXBlKHtcbiAgICBuYW1lOiAnR2VvSlNPTkludGVyZmFjZScsXG4gICAgZmllbGRzOiAoKSA9PiAoe1xuICAgICAgdHlwZTogeyB0eXBlOiBuZXcgTm9uTnVsbChHZW9KU09OLlR5cGVFbnVtKSB9LFxuICAgICAgY3JzOiB7IHR5cGU6IEdlb0pTT04uQ29vcmRpbmF0ZVJlZmVyZW5jZVN5c3RlbU9iamVjdCB9LFxuICAgICAgYmJveDogeyB0eXBlOiBuZXcgTGlzdChGbG9hdCkgfSxcbiAgICB9KSxcbiAgICByZXNvbHZlVHlwZTogdmFsdWUgPT4gR2VvSlNPTltgJHt2YWx1ZS50eXBlfU9iamVjdGBdLFxuICB9KSxcblxuICBHZW9tZXRyeUludGVyZmFjZTogbmV3IEludGVyZmFjZVR5cGUoe1xuICAgIG5hbWU6ICdHZW9KU09OR2VvbWV0cnlJbnRlcmZhY2UnLFxuICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgIHR5cGU6IHsgdHlwZTogbmV3IE5vbk51bGwoR2VvSlNPTi5UeXBlRW51bSkgfSxcbiAgICAgIGNyczogeyB0eXBlOiBHZW9KU09OLkNvb3JkaW5hdGVSZWZlcmVuY2VTeXN0ZW1PYmplY3QgfSxcbiAgICAgIGJib3g6IHsgdHlwZTogbmV3IExpc3QoRmxvYXQpIH0sXG4gICAgICBjb29yZGluYXRlczogeyB0eXBlOiBHZW9KU09OLkNvb3JkaW5hdGVzU2NhbGFyIH0sXG4gICAgfSksXG4gICAgcmVzb2x2ZVR5cGU6IHZhbHVlID0+IEdlb0pTT05bYCR7dmFsdWUudHlwZX1PYmplY3RgXS5uYW1lLFxuICAgIC8vIHJlc29sdmVUeXBlOiB2YWx1ZSA9PiB2YWx1ZS50eXBlLFxuICB9KSxcblxuICBHZW9tZXRyeVR5cGVVbmlvbjogbmV3IFVuaW9uVHlwZSh7XG4gICAgbmFtZTogJ0dlb0pTT05HZW9tZXRyeVR5cGVzJyxcbiAgICBkZXNjcmlwdGlvbjogJ0dlb21ldHJ5IFR5cGVzJyxcbiAgICB0eXBlczogKCkgPT4gW1xuICAgICAgR2VvSlNPTi5Qb2ludE9iamVjdCxcbiAgICAgIEdlb0pTT04uTXVsdGlMaW5lU3RyaW5nT2JqZWN0LFxuICAgICAgR2VvSlNPTi5MaW5lU3RyaW5nT2JqZWN0LFxuICAgICAgR2VvSlNPTi5Qb2x5Z29uT2JqZWN0LFxuICAgICAgR2VvSlNPTi5NdWx0aVBvaW50T2JqZWN0LFxuICAgICAgR2VvSlNPTi5NdWx0aVBvbHlnb25PYmplY3QsXG4gICAgXSxcbiAgICByZXNvbHZlVHlwZTogdmFsdWUgPT4ge1xuICAgICAgaWYgKHZhbHVlLnZhbHVlID09PSBHZW9KU09OLlR5cGVFbnVtLlBvaW50LnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBHZW9KU09OLlBvaW50T2JqZWN0Lm5hbWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUudmFsdWUgPT09IEdlb0pTT04uVHlwZUVudW0uTXVsdGlMaW5lU3RyaW5nLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBHZW9KU09OLk11bHRpTGluZVN0cmluZ09iamVjdC5uYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlLnZhbHVlID09PSBHZW9KU09OLlR5cGVFbnVtLkxpbmVTdHJpbmcudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEdlb0pTT04uTGluZVN0cmluZ09iamVjdC5uYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlLnZhbHVlID09PSBHZW9KU09OLlR5cGVFbnVtLk11bHRpUG9pbnQudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEdlb0pTT04uTXVsdGlQb2ludE9iamVjdC5uYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlLnZhbHVlID09PSBHZW9KU09OLlR5cGVFbnVtLlBvbHlnb24udmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEdlb0pTT04uUG9seWdvbk9iamVjdC5uYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlLnZhbHVlID09PSBHZW9KU09OLlR5cGVFbnVtLk11bHRpUG9seWdvbi52YWx1ZSkge1xuICAgICAgICByZXR1cm4gR2VvSlNPTi5NdWx0aVBvbHlnb25PYmplY3QubmFtZTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZS52YWx1ZSA9PT0gR2VvSlNPTi5UeXBlRW51bS5NdWx0aVBvaW50LnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBHZW9KU09OLk11bHRpUG9pbnRPYmplY3QubmFtZTtcbiAgICAgIH1cbiAgICB9LFxuICB9KSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdlb0pTT047XG4iXX0=